import { useEffect, useState } from "react";

const useFetch =(url) =>{
    const [selectedDuration, setselectedDuration] = useState()
    const [dataTopChartList, setdataTopChartList] = useState([])
    const [isloading, setIsLoading] = useState(true)
    const [error, setError] =useState(null)

  useEffect(() =>{
    const fetchMusic = async () =>{
      try{
        const response = await fetch(url);
        if(!response.ok){
          throw new Error(`Error: ${response.status}: ${response.statusText}`)
        }
        const data = await response.json();
        setdataTopChartList(data.results);
      } catch(err){
        setError(err.message)
      }finally{
        setIsLoading(false)
      }
    }
    fetchMusic();
  }, [url])

  return{ setselectedDuration, selectedDuration, error, isloading, dataTopChartList }
}
export default useFetch;