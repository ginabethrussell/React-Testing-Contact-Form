import axios from 'axios';

async function usePostData (data) {
    const result = await axios.post("https://reqres.in/api/users", data)
    .then(res => {
        return res.data;
    })
    .catch(err => console.log(err))
    return result;
} 

export default usePostData;