import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export const FeedsInfoPage = () => {
    const [feedDetails, setFeedDetails] =useState();
    const params = useParams();
    useEffect(() => {
        const handleFeedsInfoFetch = async () => {
          try {
            const res = await axios.get(`https://api.jamendo.com/v3.0/feeds`, {
              params: {
                client_id: '117e1348',
                format: 'jsonpretty',
                id: params.id,
              },
            })
            setFeedDetails(res.data.results)
            console.log(res.data.results);
          } catch (error) {
            console.error('Error while fetching the tracks', error)
          }
        }
        if (params.id) {
          handleFeedsInfoFetch()
        }
      }, [params.name])
    
  return (
    <div>{
        feedDetails?(
            <div>
                
            </div>
        ): <p>An error occured please go back to the <a href="/">Home page</a> </p>
    }</div>
  )
}
