import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useSearch } from '../../hooks/useSearch'
import { ChevronLeft, ChevronLeftCircle, ChevronRight, ChevronRightCircle } from 'lucide-react'


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
  const [ query, setQuery ] = useState('')
  const [ pageNumber, setPageNumber ] = useState()

  function handleSearch(e){
    setQuery(e.target.value)
    setPageNumber(1)
    console.log(searchData);
  }

  const { searchData} = useSearch(query, pageNumber)
    return (
        <div className='flex justify-between items-center mb-4'>
        <button title='Go back'
        onClick={goBack}
        disabled={history.length <= 1}
        className="group p-2 rounded-full disabled:cursor-not-allowed bg-green-500 disabled:bg-transparent hover:bg-green-600 transition"
        >
            <ChevronLeft className="text-white group-disabled:text-gray-400" size={22} />
        </button>
        
        <button
        title='Go forward'
        className="group p-2 rounded-full disabled:cursor-not-allowed bg-green-500 disabled:bg-transparent hover:bg-green-600 transition" 
        onClick={ goForward } 
        disabled={ forward.length === 0 }>
            <ChevronRight className="text-white group-disabled:text-gray-400" size={22} />
        </button>
        
        <div className='rounded-2xl inline-flex  bg-green-200 p-3 text-xl'>
            <label htmlFor="search">Search</label>
            <input type="search" onChange={handleSearch} id="search" className="outline-none " />
        </div>
      </div>
  )
}

export default NavgationButtons