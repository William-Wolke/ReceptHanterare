import axios from 'axios';

export default async function apiPost(path, body) {
    let response = false;

    try {
        let url = new URL(path, process.env.NEXT_PUBLIC_BASE_URL).href;
        let res = await axios.post(url, body);
        if (res.status === 200) {
            response = true;
        }
        return response;
    } catch (err) {
        console.error(err.message);
        response = false;
    }
}
