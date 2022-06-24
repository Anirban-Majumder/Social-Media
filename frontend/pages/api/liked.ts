import type { NextApiRequest, NextApiResponse } from 'next'
import groq from 'groq'
import { sanityClient } from '../../sanity'

type Data = {
    message: string
}

const Query = groq`
*[_type=="likes"  && references($tweetId) && references($userId)]{
    liked
  }`  


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { tweetId, userId }= req.query
    const like = await sanityClient.fetch(Query, { tweetId, userId })
    console.log(like)
    res.status(200).json(like)
}
