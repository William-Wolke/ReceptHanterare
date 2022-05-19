import axios from 'axios';

const UseAxios = (path, body) => {

    let response = false;
    let url = new URL(path, process.env.REACT_APP_DB_HOSTNAME).href;

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