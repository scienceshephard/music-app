import axios from "axios";
import { useContext, useEffect } from "react"
import { MyContext } from "../Context";

export const useSearch = (query, pageNumber) => {
  const { setSearchData, searchData} = useContext(MyContext)

  useEffect(() =>{
    let cancel;
    const endpoints =[
      {
        url: 'https://api.jamendo.com/v3.0/tracks',
        type: 'tracks',
      },
      {
        url: 'https://api.jamendo.com/v3.0/album',
        type: 'album',
      },
      {
        url: 'https://api.jamendo.com/v3.0/artist',
        type: 'artist',
      }
    ]
    Promise.all(endpoints.map(({url, type}) =>
    axios(url, {
      params: {
            client_id: '117e1348',
            search: query,
            format: 'jsonpretty'
        },
        cancelToken: new axios.CancelToken(c => cancel = c)
    }).then((res) =>({
      type,
      results: res.data.results
    }))
    )).then((Results) =>{
      const combined = Results.flatMap(({type, results}) => results.map((item) => ({...item, type})));
      if(pageNumber ===1){
        setSearchData(combined)
      }else{
        setSearchData((prev) => [...prev, ...combined])
      }
    }).catch((err) =>{
      if(axios.isCancel(err)) return;
      console.error("Search error", err)
    })
    return()=> cancel();
  }, [query, pageNumber])
  return { searchData, setSearchData }
}
