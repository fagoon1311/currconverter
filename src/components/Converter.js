import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import { HiArrowsRightLeft } from 'react-icons/hi2'

// https://api.frankfurter.app/currencies
// /latest?amount=10&amp;from=GBP&amp;to=USD`
const Converter = () => {
    const [currencies, setCurrencies] = useState([])
    const [amount, setAmount] = useState(1)
    const [fromCurrency, setFromCurrency] = useState(['USD'])
    const [toCurrency, setToCurrency] = useState('INR')
    const [convertedAmount, setConvertedAmount] = useState(null)
    const [converting, setConverting] = useState(false)
    const [favourites, setFavourites] = useState(["INR", "USD"])

   
    useEffect(()=>{
        getCurrency()
    }, []) 
    const getCurrency = async() => {
        const data = await fetch('https://api.frankfurter.app/currencies')
        const json = await data.json()
        setCurrencies(Object.keys(json))
    }
    
    useEffect(()=>{
        currencyConverter()
    }, [])

    const currencyConverter = async() =>{
        const data = await fetch( `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
        const json = await data.json()
        console.log(json)
        setConvertedAmount(Object?.values(json?.rates)[0])
    }
  
    const handleFavourites = (currency) => {
        let updatedFavourites = [...favourites]
        if(favourites.includes(currency)){
            updatedFavourites = updatedFavourites.filter((curr)=>curr!==currency)
        }
        else {
            updatedFavourites.push(currency)
        }
        
        setFavourites(updatedFavourites)
    }

    const handleSwap = () =>{
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }
  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
     
        <h2 className='mb-5 text-gray-700 text-2xl'> Currency Converter</h2>        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <Dropdown
                favourites={favourites}
                currencies={currencies}
                title="From:"
                currency={fromCurrency}    
                setCurrency={setFromCurrency}
                handleFavourites={handleFavourites}
            />
            <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={handleSwap}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>
            <Dropdown
                favourites={favourites}
                currencies={currencies}
                title="To:"
                currency={toCurrency}    
                setCurrency={setToCurrency}
                handleFavourites={handleFavourites}
            />

        </div>
        <div>
            <label className='block text-gray-700 font-medium text-sm p-2'>Amount:</label>
            <input onChange={(e)=>setAmount(e.target.value)}
            value={amount}
            className='w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500' type='number'></input>
        </div>
        <div className='flex justify-end mt-6'>
            <button onClick={currencyConverter}
            className='bg-indigo-600 p-2 rounded-xl text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>Convert</button>
        </div>
        {convertedAmount && <div className='mt-4 text-lg font-medium text-right text-green-600'>
            Converted Amount: {convertedAmount} {toCurrency}
        </div>}
    </div>
  )
}

export default Converter