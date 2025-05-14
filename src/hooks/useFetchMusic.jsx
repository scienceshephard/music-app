import axios from "axios";
import {  useEffect, useState } from "react";
import { MyContext } from "../Context";

const useFetch =(url) =>{
    const [isloading, setIsLoading] = useState()
    const [error, setError] =useState()
    const [fetchedData, setFetchedData] = useState([])
    const [hasMore, setHasMore] = useState(false)
    

  useEffect(() =>{
    setIsLoading(true)
    setError(false)
    let cancel;
    axios({
      method: 'GET',
      url: `https://api.jamendo.com/v3.0/${url}`,
      params: {
        client_id: '117e1348',
        format: 'jsonpretty',
        limit: 10,
        offset: Math.floor(Math.random() * 1000)
      },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then((response) => {
      setHasMore(response.data.results.length > 0)
      setFetchedData( response.data.results);
      setIsLoading(false)
    }).catch(e =>{
      if(axios.isCancel(e)) return;
      setError(true)
    })
    return()=>cancel();
  }, [url])

  return{ error, isloading, fetchedData, hasMore }
}
export default useFetch;