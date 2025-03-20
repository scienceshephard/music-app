import React from 'react'

export const TopChart = () => {
  return (
    <div className='border flex '>
      <p>Top-chart</p> 
        <select name="" className='ml-auto text-gray-600'>
          <option value="today">Today</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
    </div>
  )
}
