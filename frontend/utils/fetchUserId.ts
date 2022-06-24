export const fetchUserId = async (email: any) => {
    const res = await fetch(`/api/getUserId?email=${email}`)
    const id = await res.json()
    return id[0]._id
}