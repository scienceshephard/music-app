import React from 'react'
import { Link } from 'react-router'

export const FeedsComponent = ({
    feedsError,
    feeds,
    offsetLoading,
}) => {

  return (
    <div
          className="overflow-x-auto scroll-smoothborder flex gap-5 mb-5"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

        {
            offsetLoading && feeds.length === 0 &&(
                <>
                    {[1, 2, 3, 4, 5].map((item)=>{
                        <div key={item} className="animate-pulse flex space-x-4 border rounded-lg bg-gray-200 h-40 w-28"></div>
                    })}
                </>
            ) 
        }
    {
        feeds.length > 0?
        feeds.map((feed) =>{
        return(
            <div className='shadow-xl p-2.5 bg-gray-100 rounded-lg min-w-[300px] min-h-fit ' key={feed.id}>
                <h3 className="font-bold text-lg mb-2">
                    {feed?.title?.en || feed?.title?.fr || Object.values(feed?.title || {})[0] || 'No title'}
                </h3>
                <div className="text-sm text-gray-600">
                    <p className="line-clamp-2 indent-[20px]">
                        {feed?.text?.en || feed?.text?.fr || Object.values(feed?.text || {})[0] || 'No description'}
                    </p><Link className="text-green-600 font-bold" to= {`/feed/${feed?.id}`} >read more...</Link>
                </div>
            </div>
            )
        }):
        feedsError && (
            <div className="text-red-500">Error:{feedsError} {' '}<a href="/">Refresh page</a></div>
        )
    }

    </div>
)
}
