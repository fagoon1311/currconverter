import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'

// https://api.frankfurter.app/currencies
// /latest?amount=10&amp;from=GBP&amp;to=USD`
const Converter = () => {
    const [currencies, setCurrencies] = useState([])
    const [amount, setAmount] = useState(1)
    const [fromCurrency, setFromCurrency] = useState(['USD'])
    const [toCurrency, setToCurrency] = useState('INR')

    useEffect(()=>{
        getCurrency()
    }, [])

    const getCurrency = async() => {
        const data = await fetch('https://api.frankfurter.app/currencies')
        const json = await data.json()
        setCurrencies(Object.keys(json))
    }

    const currencyConverter = () =>{}
  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
     
        <h2 className='mb-5 text-gray-700 text-2xl'> Currency Converter</h2>        
        <div>
            <Dropdown
                // favorites={favorites}
                currencies={currencies}
                title="From:"
                //   currency={fromCurrency}    
                //   setCurrency={setFromCurrency}
                //   handleFavorite={handleFavorite}
            />
            <button>Swap</button>
            <Dropdown
                // favorites={favorites}
                currencies={currencies}
                title="To:"
                //   currency={fromCurrency}    
                //   setCurrency={setFromCurrency}
                //   handleFavorite={handleFavorite}
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
        <div className='mt-4 text-lg font-medium text-right text-green-600'>
            Converted Amount: 69USD 
        </div>
    </div>
  )
}

export default Converter