import React, { useRef, useState } from 'react'
import {
    EmojiHappyIcon,
    PhotographIcon,
    SearchCircleIcon
} from "@heroicons/react/outline";
import { useSession } from 'next-auth/react';
import { Tweet, TweetBody } from '../typings';
import { fetchTweets } from '../utils/fetchTweets';
import { fetchUserId } from '../utils/fetchUserId'
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });


interface Props {
    setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}

function TweetBox({ setTweets }: Props) {
    const [input, setInput] = useState<string>('')
    const [image, setImage] = useState('')
    const { data: session } = useSession()
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState<boolean>(false)

    const onEmojiClick = (event:any , emojiObject:any) => {
        setInput(input+emojiObject.emoji);
        setEmojiPickerIsOpen(false);
    };
    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log(imageInputRef)
        if(!imageInputRef.current?.value) return
        setImage(imageInputRef.current.value)
        imageInputRef.current.value = ''
        setImageUrlBoxIsOpen(false)
    }
    const postTweet = async () => {
        const user = await fetchUserId(session?.user?.email)
		
        const tweetBody: TweetBody = {
            text: input,
            username: user || "Unknown User",
            userimg: " ",
            image: image
        }

        const result = await fetch(`/api/addTweet`, {
            body: JSON.stringify(tweetBody),
            method: 'POST'
        })

        const json = await result.json()
        const newTweets = await fetchTweets()
        setTweets(newTweets)
        toast('Tweet Posted', {icon: '🚀'})
        return json
    }
    const handleSubmit = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        postTweet()
        setInput('')
        setImage('')
        setImageUrlBoxIsOpen(false)
    }

    return (
        <div className='flex space-x-2 p-5 flex-wrap'>
            <img className='h-14 w-14 object-cover rounded-full mt-4' src={session?.user?.image || "/profile.jpg"} alt="" />
            <div className='flex flex-1 pl-2'>
                <form className='flex flex-1 flex-col'>
                    <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text" placeholder="What's Happening" className='outline-none h-24 w-full text-base placeholder:text-base p-2 bg-boxcolor rounded-lg mb-6 md:px-10 md:text-xl md:placeholder:text-xl' />
                    <div className='flex items-center'>
                        <div className='flex flex-1 space-x-2 text-twitter'>
                            {/* Icons */}
                            <PhotographIcon  className='h-5 w-5' />
                            <SearchCircleIcon onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)} className='h-5 w-5 cursor-pointer transition transform duration-500 ease-out hover:scale-110' />
                            <EmojiHappyIcon className='h-5 w-5' onClick={() => setEmojiPickerIsOpen(!emojiPickerIsOpen)}/>
                        </div>
                        <button 
                        onClick={handleSubmit}
                        disabled={!input || !session} className='bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40'>Post</button>
                    </div> 
                    {image && 
                        <img src={image} className='mt-10 h-40 w-full rounded-xl object-contain shadow-lg'/>
                    }
                </form>
            </div>
            {emojiPickerIsOpen && (
                <Picker onEmojiClick={onEmojiClick} groupVisibility={{flags: false,}} native={true} disableSearchBar={true} />    
            )}
            {imageUrlBoxIsOpen && (
                <form className='flex flex-1 flex-col'>
                    <input ref={imageInputRef} type="text" placeholder='Enter Image Url'
                    className='outline-none h-20 mt-4 text-base placeholder:text-base p-2 bg-boxcolor rounded-lg mb-6 md:px-10 md:text-xl md:placeholder:text-xl'/>
                    <div className='flex'>
                        <button onClick={addImageToTweet} type="submit" 
                        disabled={!session} className='bg-twitter ml-2 px-5 py-2 font-bold text-white rounded-full disabled:opacity-40'>Add Image</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default TweetBox