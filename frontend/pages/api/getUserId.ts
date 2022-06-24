import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../typings'
import { groq } from "next-sanity"
import { sanityClient } from '../../sanity'

const Query = groq`
*[_type=="user" && email==$email]{
    _id,
  }`

type Data = User

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { email }= req.query
    const exist: User = await sanityClient.fetch(Query,{email})
    //console.log(Query,{email})
    //console.log(exist)
    res.status(200).json(exist)
}
