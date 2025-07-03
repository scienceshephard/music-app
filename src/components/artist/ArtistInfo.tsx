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

  // ...existing code...
  return (
    <>
      {artistInfo && artistInfo.length > 0 ? (
        <div>
          {artistInfo.map((artist, index) => (
            <div key={index} className='text-center my-4'>
              <img src={artist.image || 'https://www.w3schools.com/howto/img_avatar.png'} alt={artist.name} className='w-2/3 mx-auto rounded-2xl' />
              <p className='text-lg font-semibold'>{artist.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <h1 className='text-2xl font-bold text-center my-4'>No Artist Info Found</h1>
      )}
    </>
  )
}
