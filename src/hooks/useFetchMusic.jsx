import axios from "axios";
import { useEffect, useState } from "react";
import { MyContext } from "../Context";

const useFetch = (url, offset) => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchedData, setFetchedData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    let cancel;
    
    axios({
      method: 'GET',
      url: `https://api.jamendo.com/v3.0/${url}`,
      params: {
        client_id: '117e1348',
        format: 'jsonpretty',
        limit: 10,
        offset: offset
      },
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then((response) => {
      setHasMore(response.data.results.length > 0);
      setFetchedData(response.data.results);
      setIsLoading(false);
    })
    .catch(e => {
      if (axios.isCancel(e)) return;
      setError(e.message || "An error occurred");
      setIsLoading(false);
    });
    
    return () => cancel();
  }, [url, offset]); // Add offset to dependency array
  
  return { error, isloading, fetchedData, hasMore };
};

export default useFetch;