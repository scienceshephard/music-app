import axios from "axios";
import { useEffect, useState } from "react";

const useFetch =(url) =>{
    const [isloading, setIsLoading] = useState(true)
    const [error, setError] =useState(null)
    const [fetchedData, setFetchedData] = useState([])

  useEffect(() =>{
    // const fetchMusic = async () =>{
    //   try{
    //     const response = await fetch(`https://api.jamendo.com/v3.0/${url}`);
    //     if(!response.ok){
    //       throw new Error(`Error: ${response.status}`)
    //     }
    //     const data = await response.json();
        
    //     setFetchedData(data.results);
    //   } catch(err){
    //     setError(err.message)
    //   }finally{
    //     setIsLoading(false)
    //   }
    // }
    // fetchMusic();
    axios({
      method: 'GET',
      url: `https://api.jamendo.com/v3.0/${url}`,
      params: {
        client_id: '117e1348',
        format: 'jsonpretty',
        limit: 10,
        offset: Math.floor(Math.random() * 1000)
      }
    }).then((response) => {
      setFetchedData(response.data.results);
    })
  }, [url])

  return{ error, isloading, fetchedData }
}
export default useFetch;