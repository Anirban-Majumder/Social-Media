import type { NextApiRequest, NextApiResponse } from 'next'
import { Like } from '../../typings'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const like: Like = JSON.parse(req.body)

  const mutations1 = {
    mutations: [
      {
        patch: {
          id: like.tweetId,
          dec: {
            likes: 1
          }
        },
      },
    ],
  }

  const mutations2 = {
    mutations: [
      {
        delete: {
          query:
            `*[_type == "likes" && user._ref == "${like.userId}" && tweet._ref == "${like.tweetId}"]`
        }
      }
    ]
  }

  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-03-25/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`

  const result1 = await fetch(apiEndpoint, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`
    },
    body: JSON.stringify(mutations1),
    method: 'POST'
  })

  const result2 = await fetch(apiEndpoint, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`
    },
    body: JSON.stringify(mutations2),
    method: 'POST'
  })

  const json = await result1.json()
  const json2 = await result2.json()

  res.status(200).json({ message: 'success' })
}