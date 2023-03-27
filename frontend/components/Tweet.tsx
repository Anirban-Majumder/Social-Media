// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { Comment, CommentBody, Like, Tweet} from '../typings'
import TimeAgo from 'react-timeago'
import {
  ChatAlt2Icon,
  HeartIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { fetchComments } from '../utils/fetchComments'
import {fetchUserId} from '../utils/fetchUserId'
import { fetchLikes } from '../utils/fetchLikes'


interface Props {
  tweet: Tweet
}

function Tweet({ tweet }: Props) {
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
  const [liked, setLiked] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const [comments, setComments] = useState<Comment[]>([])
  const [isLiking, setIsLiking] = useState<boolean>(false)
  const { data: session } = useSession()

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments)
  }

  const refreshliked = async () => {
    const value: boolean = await fetchLikes(tweet._id, session?.user?.email)
    setLiked(value)
  }

  const formatter = (value, unit, suffix) => {
    if (unit === 'second') {
        return 'less then a minute ago';
    }
    return `${value} ${unit}${
        value !== 1 ? 's' : ''
    } ${suffix}`;
  }

  useEffect(() => {
    if (session) {
      refreshliked();
    }
  }, [session]);

  useEffect(() => {
    refreshComments()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const commentToast = toast.loading('Posting Comment...')
    const user = await fetchUserId(session?.user?.email)

    // Comment logic
    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: user || 'Unknown User',
      userimg: '',
    }

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: 'POST',
    })

    //console.log('WOOHOO we made it', result)
    toast.success('Comment Posted!', {
      id: commentToast,
    })

    setInput('')
    setCommentBoxVisible(false)
    refreshComments()
  }

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    setLiked(!liked);

    const like: Like = {
      tweetId: tweet._id,
      userId: await fetchUserId(session?.user?.email),
    };

    await fetch(`/api/${liked ? "removeLike" : "addLike"}`, {
      body: JSON.stringify(like),
      method: "POST",
    });

    setIsLiking(false);
  };

  return (
    <div
      key={tweet._id}
      className="flex flex-col space-x-3 border-y border-bordercolor p-5"
    >
      <div className="flex space-x-3 overflow-hidden">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.userimg || '/profile.jpg'}
          alt=""
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-textgray sm:inline">
              @{tweet.username.replace(/\s+/g, '').toLowerCase()} ·
            </p>

            <TimeAgo
              className="text-sm text-textgray"
              date={tweet._createdAt}
              formatter={formatter}
            />
          </div>

          <p className="pt-1 break-word">{tweet.text}</p>

          {tweet.image && (
            <img
              src={tweet.image}
              className="m-5 ml-0 mb-1 max-h-60  rounded-lg object-cover shadow-sm"
              alt=" "
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div
          onClick={(e) => session && setCommentBoxVisible(!commentBoxVisible)}
          className="flex cursor-pointer items-center ml-10 text-textgray transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
        >
          <ChatAlt2Icon className="h-6 w-6" />
          <p>{comments.length}</p>
        </div>
        {!liked && (
        <div className="flex cursor-pointer items-center mr-10 text-textgray transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
          onClick={(j) => session && !isLiking && handleLike()}>
          <HeartIcon className="h-6 w-6 hover:text-red-700" />
          <p>{tweet.likes===0?" ":tweet.likes}</p>
        </div>
        )}
        {liked && (
        <div className="flex cursor-pointer items-center mr-10"
          onClick={(j) => session && !isLiking && handleLike()}>
          <HeartIcon className="h-6 w-6 fill-red-600 text-red-600" />
          <p>{tweet.likes+1}</p>
        </div>
        )}
      </div>

      {commentBoxVisible && (
        <form className="mt-3 flex space-x-3" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg bg-boxcolor p-2 outline-none placeholder:text-textgray dark:bg-darkboxcolor"
            type="text"
            placeholder="Write a comment..."
          />
          <button
            className={!(!input|| !session) ?
              'bg-twitter px-3 py-2 font-bold text-white rounded-full transition ease-in-out  hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300' :
              'bg-twitter px-3 py-2 font-bold text-white rounded-full opacity-40'}
            type="submit"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-bordercolor p-5 scrollbar-hide">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <img
                src={comment.userimg}
                className="mt-2 h-7 w-7 rounded-full object-cover"
                alt=""
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-textgray lg:inline">
                    @{comment.username.replace(/\s+/g, '').toLowerCase()} ·
                  </p>

                  <TimeAgo
                    className="text-sm text-textgray"
                    date={comment._createdAt}
                    formatter={formatter}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tweet
