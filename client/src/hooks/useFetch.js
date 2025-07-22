import {useState, useEffect} from 'react'

const useFetch = (url)=>{

    const [data, setData] = useState([])

    useEffect(()=>{
        const getData = async ()=>{
            const res = await fetch(url);
            const d = await res.json();
            setData(d); 
        }
        getData();
    },[url])

    return {data}

}


export default useFetch;