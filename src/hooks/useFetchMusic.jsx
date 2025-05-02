import { useEffect, useState } from "react";

const useFetch =(url) =>{
    const [isloading, setIsLoading] = useState(true)
    const [error, setError] =useState(null)
    const [fetchedData, setFetchedData] = useState([])

  useEffect(() =>{
    const fetchMusic = async () =>{
      try{
        const response = await fetch(`https://api.jamendo.com/v3.0/${url}`);
        if(!response.ok){
          throw new Error(`Error: ${response.status}: ${response.statusText}`)
        }
        const data = await response.json();
        setFetchedData(data.results);
      } catch(err){
        setError(err.message)
      }finally{
        setIsLoading(false)
      }
    }
    fetchMusic();
  }, [])

  return{ error, isloading, fetchedData }
}
export default useFetch;