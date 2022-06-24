export interface Tweet extends TweetBody {
    _id: string
    _createdAt: string
    _type: 'tweet'
    likes: number
}
export type TweetBody = {
    text: string
    username: string
    userimg: string
    image?: string
}

export interface Comment extends CommentBody {
    _id: string
    _createdAt: string
    type: 'comment'
}

export type CommentBody = {
    comment: string
    tweetId: string
    username: string
    userimg: string
}

export type User ={
    _id: string
}

export type Like = {
    userId: string
    tweetId: string
}