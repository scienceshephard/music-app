import React, { useContext } from 'react'
import { Link } from 'react-router'
import { MyContext } from '../../Context';
import axios from 'axios';

export const Album_Card = ({album}) => {
    
    
    //Selected song
    const {setSelectedSong ,setAlbumloading} = useContext(MyContext);
  
    const HandleSelectedSong = async (item) => {
      console.log(item);
      
      setAlbumloading(true);
      try{
        const res = await axios.get(`https://api.jamendo.com/v3.0/tracks`, {
          params:{
            client_id: '117e1348',
            format: 'jsonpretty',
            album_id: item.id
          }
        })
        const tracks = res.data.results;
        if(tracks.length > 0) {
          console.log('tracks' ,tracks);
          setSelectedSong(tracks[0]);}
          else{
            console.warn('No tracks found for album ', item.name);     
          }
      }catch(error){
        console.error('Error while fetching the tracks', error);
        
      }finally{
        setAlbumloading(false)
      }
    }
  

  return (
        <div className="flex flex-col bg-gray-200 hover:bg-gray-400 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow min-w-[110px] max-w-[110px]"  onClick={ ()=> HandleSelectedSong(album) }>
            <img 
            src={album?.image} 
            alt={`${album.name} album cover`} 
            className="w-full h-24 object-cover rounded-md mb-2 hover:blur-[2px] hover:cursor-pointer" 
            loading="lazy"
            />
            <Link 
            to={`/artist/${album?.artist_id}`} 
            className="text-blue-600 hover:text-blue-950 text-sm font-medium truncate"
            >
            {album?.artist_name}
            </Link>
            <span className="text-xs text-gray-700 truncate" title={album?.name}>
            {album?.name}
            </span>
        </div>
  )
}
