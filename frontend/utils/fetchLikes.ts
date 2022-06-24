import { fetchUserId } from "./fetchUserId"

export const fetchLikes = async (tweetId: string, email: any) => {
    //console.log(tweetId, email)
    var result : boolean
    if (email==undefined || email==null) {
        result=false
    }
    else {
        //console.log("fetching user id")
        const userId = await fetchUserId(email)
        //console.log(userId)
        //console.log("fetching likes")
        const res = await fetch(`api/liked?tweetId=${tweetId}&userId=${userId}`)
        //console.log(res)
        const liked = await res.json()
        liked.length==0?result=false:result=true

    }
    return result
}
