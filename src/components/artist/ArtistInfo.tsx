import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export const ArtistInfo = () => {
  const params = useParams()
  const [artistInfo, setArtistInfo] = useState()

  useEffect(() => {
    const handleArtistinfoFetch = async () => {
      try {
        const res = await axios.get(`https://api.jamendo.com/v3.0/artists`, {
          params: {
            client_id: '117e1348',
            format: 'jsonpretty',
            name: params.name,
          },
        })
        setArtistInfo(res.data.results)
        console.log(res.data.results);
      } catch (error) {
        console.error('Error while fetching the tracks', error)
      }
    }
    if (params.name) {
      handleArtistinfoFetch()
    }
  }, [params.name])

  useEffect(() => {
    // console.log('Updated artistInfo:', artistInfo)
  }, [artistInfo])

  return (
    <div>
      {artistInfo ? (
        <div className="">
          <img src={ artistInfo[0].image } alt={artistInfo[0].name} className=' w-2/3 border mx-auto rounded-2xl' />
          <p>{ artistInfo[0].name }</p>
        </div>
      ) : (
        <p>No artist info found</p>
      )}
    </div>
  )
}
