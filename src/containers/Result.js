import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ResultSection from '../sections/ResultSection/ResultSection';

const useQuery= () => {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Result = () => {
    const state = useLocation().state;
    const query = useQuery();
    const [result, setResult] = useState(state?.result);
    const [loading, setLoading] = useState(result ? false : true);
    const [invalid, setInvalid] = useState(false);

    const uid = query.get('id');
    const imageURL = query.get('url');
    const model = query.get('model');

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`https://face-reco-alpha-e205c6b29a80.herokuapp.com/image/result/${uid}`, {
                method: 'get',
                headers: {'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .catch(console.log);

            if (res.error) {
                setInvalid(true);
                setLoading(false);
                return;
            }
            
            console.log(res.result);

            setResult(res.result);
            setLoading(false);
        }

        if (!result) {
            fetchData();
        }
    }, [result, uid, invalid])

    return (
        <div>
            {loading ?
                <p style={{height: '500px'}}>Loading...</p>:
                !invalid ?
                <ResultSection uid={uid} imageURL={imageURL} model={model} result={result} profile={state?.profile} />:
                <p>Doesn't exist</p>
            }
        </div>
    );    
}

export default Result;