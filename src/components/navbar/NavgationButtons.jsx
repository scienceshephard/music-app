import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useSearch } from '../../hooks/useSearch'
import { CiSearch } from 'react-icons/ci'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'

const NavgationButtons = () => {
  const [showInput, setShowInput] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [history, setHistory] = useState(['/'])
  const [forward, setForward] = useState([])

  const inputRef = useRef(null)
  const containerRef = useRef(null)

  const isNavigatingBack = useRef(false)
  const isNavigatingForward = useRef(false)

  useEffect(() => {
    if (isNavigatingBack.current) {
      isNavigatingBack.current = false
      return
    }
    if (isNavigatingForward.current) {
      isNavigatingForward.current = false
      return
    }
    setHistory((prev) => {
      if (prev[prev.length - 1] !== location.pathname)
        return [...prev, location.pathname]
      return prev
    })
    setForward([])
  }, [location.pathname])

  const goBack = () => {
    if (history.length > 1) {
      const prevHistory = [...history]
      const lastPage = prevHistory.pop()
      setHistory(prevHistory)
      setForward((fwd) => [lastPage, ...fwd])
      isNavigatingBack.current = true
      navigate(prevHistory[prevHistory.length - 1])
    }
  }

  const goForward = () => {
    if (forward.length > 0) {
      const [next, ...rest] = forward
      setForward(rest)
      setHistory((prev) => [...prev, next])
      isNavigatingForward.current = true
      navigate(next)
    }
  }

  // search query
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState()
  const { searchData } = useSearch(query, pageNumber)

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
    console.log(searchData)
  }

  const handleLabelClick = () => {
    setShowInput(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleBlur = () => {
    setTimeout(() => {
      const active = document.activeElement
      if (!containerRef.current?.contains(active)) {
        setShowInput(false)
      }
    }, 0)
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        title="Go back"
        onClick={goBack}
        disabled={history.length <= 1}
        className="group p-2 rounded-full disabled:cursor-not-allowed bg-green-500 disabled:bg-transparent hover:bg-green-600 transition"
      >
        <FaAngleLeft className="text-white group-disabled:text-gray-400" size={22} />
      </button>

      <button
        title="Go forward"
        className="group p-2 rounded-full disabled:cursor-not-allowed bg-green-500 disabled:bg-transparent hover:bg-green-600 transition"
        onClick={goForward}
        disabled={forward.length === 0}
      >
        <FaAngleRight className="text-white group-disabled:text-gray-400" size={22} />
      </button>

      <div
        ref={containerRef}
        onBlur={handleBlur}
        className="rounded-2xl overflow-hidden inline-flex sm:text-sm bg-green-200 p-3 lg:text-xl items-center transition-all duration-300"
      >
        <label
          htmlFor="search"
          className="text-green-800 cursor-pointer"
          onClick={handleLabelClick}
        >
          <CiSearch />
        </label>
        <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showInput ? 'opacity-100 w-[300px]' : 'opacity-0 w-0'
            }`}
        >
            <input
            type="search"
            onChange={handleSearch}
            id="search"
            ref={inputRef}
            className="outline-none bg-transparent text-green-900 w-full"
            />
        </div>
      </div>
    </div>
  )
}

export default NavgationButtons
