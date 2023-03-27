import React, { useState, useEffect, useRef} from 'react'
import {
    EmojiHappyIcon,
    PhotographIcon,
    SearchCircleIcon
} from "@heroicons/react/outline"
import { useSession } from 'next-auth/react'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import { fetchUserId } from '../utils/fetchUserId'
import toast from 'react-hot-toast'
import dynamic from 'next/dynamic'
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false })
import {EmojiStyle, EmojiClickData, Theme} from "emoji-picker-react"
import { useTheme } from 'next-themes'


interface Props {
    setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}

function TweetBox({ setTweets }: Props) {
    const [hasMounted, setHasMounted] = useState(false)
    const [input, setInput] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const { data: session } = useSession()
    const [isRawImage, setIsRawImage] = useState<boolean>(false)
    const [placeholder, setPlaceholder] = useState<string>('What\'s happening?')
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)
    const [imageLink, setImageLink] = useState<string>('')
    const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState<boolean>(false)
    const {resolvedTheme} = useTheme()
    const imgRef = useRef<HTMLImageElement>(null)


    const waitFor = (conditionFunction:any) => {
        const poll = (resolve:any) => {
          if(conditionFunction()) resolve()
          else setTimeout((_:any) => poll(resolve), 400)
        }
        return new Promise(poll)
    }

    const preViewImage = async (event : any) => {
        setImage('')
        await  waitFor((_:any) => event.target.files.length!==0)
        var selectedFile = event.target.files[0]
        if (event.target.files.length > 1) {
            toast.error('Only one image at a time')
            }
        else if(selectedFile.type === 'image/png' || selectedFile.type === 'image/svg'
            || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif'
            || selectedFile.type === 'image/tiff' || selectedFile.type === 'image/webp'
            || selectedFile.type === 'image/jpg' && selectedFile.size < 1024 * 1024 * 9) {
            const reader = new FileReader()
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target && e.target.result) {
                    setImage(e.target.result.toString())
                    setIsRawImage(true)
                }
            }
            reader.readAsDataURL(selectedFile)
            setPlaceholder('Give a Title...')
        } else {
            toast.error('Invalid Image Format')
        }
    }

    const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
        setInput(input+emojiData.emoji)
        setEmojiPickerIsOpen(false)
    }

    const checkImage = async (url:string)  => {
        const res = await fetch(url)
        const buff = await res.blob()
        if(buff.type.startsWith('image/')){
            return true
        }
    }

    const addImageLink = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        await checkImage(imageLink)? setImage(imageLink) : toast.error('Invalid Image Link!')
        setImageUrlBoxIsOpen(false)
        setImageLink('')
        setPlaceholder('Give a Title...')
    }

    const uploadFromClient = async () => {
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'my-uploads')
        try {
            const data = await fetch(
                'https://api.cloudinary.com/v1_1/asddadakasd/image/upload',
                {
                    method: 'POST',
                    body: formData,
                }
            ).then((r) => r.json())
            return data.secure_url
        } catch (error) {
            console.log(error)
            toast.error('Server Too Busy!')
        }
    }

    const postTweet = async () => {
        const noti = toast.loading('Posting...', )
        try {
            const user = await fetchUserId(session?.user?.email)
            let uploadedImageUrl = ''

            if (image) {
                if(isRawImage) {
                    uploadedImageUrl = await uploadFromClient()
                }
                else {
                    uploadedImageUrl = image
                }
            }

            const tweetBody: TweetBody = {
                text: input,
                username: user || "Unknown User",
                userimg: " ",
                image: uploadedImageUrl
            }

            const result = await fetch(`/api/addTweet`, {
                body: JSON.stringify(tweetBody),
                method: 'POST'
            })

            const json = await result.json()
            const newTweets = await fetchTweets()
            setTweets(newTweets)
            setPlaceholder('What\'s happening?')
            toast.success('Tweet Posted', {icon: '🚀',id:noti})
        } catch (error) {
            console.log(error)
            toast.error('Something went Wrong!', {icon:'😢',id:noti})
        }
    }

    const handleSubmit = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        toast.dismiss()

        if (!session) {
            toast.error('Please Login First to Post!')
        } else if (image && !input) {
            toast.error('Please Enter a Title!')
        } else if (!input) {
            toast.error('Please Enter a some text!')
        } else {
            postTweet()
            setInput('')
            setImage('')
            setIsRawImage(false)
            setImageUrlBoxIsOpen(false)
            setEmojiPickerIsOpen(false)
        }
    }

    useEffect(() => {
        //setting the size of the image box
        if (imgRef.current && imgRef.current.parentElement) {
            const aspectRatio =
                imgRef.current.naturalWidth / imgRef.current.naturalHeight
            imgRef.current.parentElement.style.width = `${
                imgRef.current.parentElement.clientHeight * aspectRatio
            }px`
        }
    }, [image])

    useEffect(() => {
        setHasMounted(true)
      }, [])

    return (
        <div className='flex space-x-2 p-5 flex-wrap'>
            <img className='h-14 w-14 object-cover rounded-full mt-4' src={hasMounted?(session?.user?.image || (resolvedTheme === 'dark'? "/profiledark.jpg" : "/profile.jpg")):"/profile.jpg"} alt="" />
            <div className='flex flex-1 pl-2'>
                <form className='flex flex-1 flex-col'>
                    <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text" placeholder={placeholder} className='outline-none h-24 w-full text-base placeholder:text-base p-2 bg-boxcolor rounded-lg mb-6 md:px-10 md:text-xl md:placeholder:text-xl dark:bg-darkboxcolor' />
                    <div className='flex items-center'>
                        <div className='flex flex-1 space-x-4 text-twitter'>
                            {/* Icons */}
                            <label htmlFor="upload-button">
                                <PhotographIcon onClick={() => {setImageUrlBoxIsOpen(false);setEmojiPickerIsOpen(false)}} className='h-5 w-5 md:h-7 md:w-7 transition ease-in-out  hover:-translate-y-1 hover:scale-110  duration-300'/>
                            </label>
                            {session &&
                            <input id="upload-button" type="file" style={{ display: 'none' }} onChange={preViewImage}/>
                            }
                            <SearchCircleIcon onClick={() => {setEmojiPickerIsOpen(false);setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}} className='h-5 w-5 md:h-7 md:w-7  transition ease-in-out  hover:-translate-y-1 hover:scale-110  duration-300' />
                            <EmojiHappyIcon  onClick={() => {setImageUrlBoxIsOpen(false);setEmojiPickerIsOpen(!emojiPickerIsOpen)}} className='h-5 w-5 md:h-7 md:w-7  transition ease-in-out  hover:-translate-y-1 hover:scale-110  duration-300'/>
                        </div>
                        <button onClick={handleSubmit} className={(input && session)?
                        'bg-twitter px-5 py-2 font-bold text-white rounded-full transition ease-in-out  hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300' :
                        'bg-twitter px-5 py-2 font-bold text-white rounded-full opacity-40'}>Post</button>
                    </div>
                    {image &&
                    <div className='mt-10 h-44 mx-auto relative'>
                        <button
                          onClick={() => setImage('')}
                          className="absolute top-0 right-0 bg-red-500 rounded-full p-1 text-xs font-bold text-white border border-red-900 shadow-md  flex items-center justify-center"
                          style={{ width: "20px", height: "20px" }}
                        >
                          X
                        </button>
                        <img ref={imgRef} src={image} className='w-full h-full rounded-xl shadow-lg object-contain mx-auto'/>
                    </div>
                    }
                </form>
            </div>
            {emojiPickerIsOpen && (
                <Picker onEmojiClick={onEmojiClick} width={300} height={350} searchDisabled={true} emojiStyle={EmojiStyle.NATIVE} skinTonesDisabled={true} theme={resolvedTheme === 'dark'?Theme.DARK:Theme.LIGHT} />
            )}
            {imageUrlBoxIsOpen && (
                <form className='flex flex-1 flex-col'>
                    <input value={imageLink}  onChange={(e) => setImageLink(e.target.value)} type="text" placeholder='Enter Image Url'
                    className='outline-none h-20 mt-4 text-base placeholder:text-base p-2 bg-boxcolor rounded-lg mb-6 md:px-10 md:text-xl md:placeholder:text-xl dark:bg-darkboxcolor'/>
                    <div className='flex'>
                        <button onClick={addImageLink} type="submit"
                            disabled={!(imageLink && session)}
                            className={(imageLink && session)?
                            'bg-twitter px-5 py-2 font-bold text-white rounded-full transition ease-in-out  hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300' :
                            'bg-twitter px-5 py-2 font-bold text-white rounded-full opacity-40'}>Add Image</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default TweetBox