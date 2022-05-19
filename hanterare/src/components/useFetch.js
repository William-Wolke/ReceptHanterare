import { useEffect, useState } from 'react';

const useFetch = (path, reqType, update) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const url = new URL(path, process.env.REACT_APP_DB_HOSTNAME).href;

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, {
            method: reqType,
            signal: abortCont.signal
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch data for that recource')
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
                console.log(data);
            })
            .catch(error => {
                
                if(error.name === 'AbortError') {

                } 
                
                else {  
                setIsPending(false);
                setError(error.message);
                }
            });

        return () => abortCont.abort();
    }, [url, reqType, update]);

    return { data, isPending, error }
}

export default useFetch;