import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { MyContext } from '../../Context'

const NavgationButtons = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [history, setHistory] = useState(['/'])
    const [forward, setForward] = useState([])

    const isNavigatingBack = useRef(false)
    const isNavigatingForward = useRef(false)
    
    useEffect(()=>{
        if(isNavigatingBack.current){
            isNavigatingBack.current = false
            return
        }
        if(isNavigatingForward.current){
            isNavigatingForward.current = false
            return
        }
        setHistory((prev) =>{
            if(prev[prev.length -1] !== location.pathname)
                return [...prev, location.pathname]
            return prev
        })
        setForward([])
    }, [location.pathname])

    const goBack = () =>{
        if(history.length >1){
            const prevHistory = [...history]
            const lastPage = prevHistory.pop()
            setHistory(prevHistory)
            setForward((fwd) =>[lastPage, ...fwd])
            isNavigatingBack.current = true
            navigate(prevHistory[prevHistory.length - 1])
        }
    }
    const goForward =() =>{
        if(forward.length > 0){
            const [next, ...rest] = forward;
            setForward(rest)
            setHistory((prev) =>[...prev, next])
            isNavigatingForward.current = true
            navigate(next)
        }
    }
    //search qeury
    const {setSearchData} =useContext(MyContext)

    return (
        <div className='flex justify-between items-center mb-4'>
        <button className='border rounded-4xl p-2 bg-green-500 text-white hover:bg-green-950 disabled:cursor-not-allowed disabled:hover:bg-green-500' onClick={ goBack } disabled={history.length <= 1}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {
        (<button className='border rounded-4xl p-2 bg-green-500 text-white hover:bg-green-950 disabled:cursor-not-allowed disabled:hover:bg-green-500' onClick={ goForward } disabled={ forward.length === 0 }>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>)
        }
        <div className='rounded-2xl inline-flex  bg-green-200 p-3 text-xl'>
            <label htmlFor="search">Search</label>
            <input type="search" id="search" className="outline-none " onChange={(e) =>{ setSearchData(e.target.value)}} />
        </div>
      </div>
  )
}

export default NavgationButtons