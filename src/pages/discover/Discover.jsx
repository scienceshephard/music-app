import React from 'react'
import { TopChart } from './Top-Chart/TopChart'

function Discover(){
    return(
        <div className='flex flex-col flex-1/3 p-[20px]'>
            <h1 className="border-l-1 border-solid border-white text-4xl font-semibold">Discover <br/> New music</h1>
            <TopChart />
        </div>
    )
}
export default Discover