import React from 'react'
import { HiOutlineStar } from "react-icons/hi2";

const Dropdown = ({
    currencies,
    currency,
    setCurrency,
    favourites,
    handleFavourites,
    title
}) => {
  return (

    <div>
        <label className='block text-sm font-medium text-gray-700'>{title}</label>
        <div className='mt-1 relative'>

            <select value={currency}
            onChange={(e)=>{setCurrency(e.target.value)}}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"    >
                
                {favourites?.map((fav)=>{return(<option value={fav} key={fav}>{fav}</option>)})}
                <hr></hr>
                {currencies?.map((curr)=>{return (
                <option value={curr} key={curr}>
                    {curr}
                </option>
                )
            })}
            </select>
            <button 
            onClick={()=>handleFavourites(currency)}
            className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"><HiOutlineStar /></button>

        </div>
    </div>
  )
}

export default Dropdown