// import React, { useContext } from 'react'
import { TopChart } from '../../components/Top-Chart/TopChart'
// import { useLocation } from 'react-router'
import { MyContext } from '../../Context'

function Feeds(){

    // const location = useLocation()
    // const {setOrigin} = useContext(MyContext)

    return(
        <div className='flex flex-col flex-1/3  px-[20px]'>
            <h1 className="border-l-1 border-solid border-white text-4xl font-semibold">Discover  <br/> New music</h1>
            <TopChart />
        </div>
    )
}
export default Feeds