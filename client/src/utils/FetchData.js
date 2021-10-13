import axios from 'axios'

//getting data
export const getData = async (url) => {
    const res = await axios.get(url)
    return res;
}

//update reviews for a product
export const patchData = async (url, data) => {
    const res = await axios.patch(url, data)
    return res;
}

//comment delete
export const deleteComment = async(url) => {
    await axios.delete(url)
}

//delete reply
export const DeleteReply = async(url, data) => {
    const res = await axios.put(url)
}

//Admin sign in
export const adminSingIn = async(url, data) => {

    const res = await axios.post(url, data)
    return res;
}