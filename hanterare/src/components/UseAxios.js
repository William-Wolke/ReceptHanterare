import axios from 'axios';

const UseAxios = (url, body) => {

    let response = false;

    axios.post(url, body)
    .then((res) => {
        if(res.status === 200) {
            response =  true;
        }
    })
    .catch((error) => {
        console.error(error)
        response = false;
    });

    return response;
}

export default UseAxios;