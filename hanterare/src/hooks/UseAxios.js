import axios from 'axios';

const UseAxios = async (path, body) => {
    let response = false;

    try {
        let url = new URL(path, process.env.REACT_APP_DB_HOSTNAME).href;
        let res = await axios.post(url, body);
        if(res.status === 200) {
            response =  true;
        }
        return response;
    } catch (err) {
        console.error(err.message)
        response = false;
    }
}

export default UseAxios;