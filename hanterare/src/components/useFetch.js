import React, { useEffect, useState } from 'react';

const useFetch = (url, reqType) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(url, {
            method: reqType,
            /*mode: 'cors',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json',},
            body: JSON.stringify(recipeName)*/
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch data for that recource')
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(error => {
                setIsPending(false);
                setError(error.message);
            });


    }, [url]);

    return { data, isPending, error }
}

export default useFetch;