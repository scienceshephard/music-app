import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export const FeedsInfoPage = () => {
    const [feedDetails, setFeedDetails] =useState([]);
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
      }, [params.id])
return (
    <div>
        {feedDetails.length > 0 ? (
            feedDetails.map((data, idx) => (
                <div key={idx}>
                    <img
                        src={data.image?.size996_350 || data.images?.size600_211 || data.images?.size470_165 || 'https://via.placeholder.com/600x211'}
                        alt={data.title?.en || "Feed image"}
                        className="w-full"
                    />
                    <h2 className="text-xl font-bold mt-2">{data.title?.en}</h2>
                    <p className="mt-1">{data.text?.en}</p>
                </div>
            ))
        ) : (
            <div className='text-red-500'>
                An error occurred. Please go back to the <a href="/">Home page</a>
            </div>
        )}
    </div>
);
}