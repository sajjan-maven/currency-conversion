import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import { HiArrowsRightLeft } from 'react-icons/hi2'
import Button from './Button';
import InputField from './InputField';
import { currencyAPI } from '../config';

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [conveting, setConverting] = useState(false)
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("favorites")) || [];
        } catch {
            return [];
        }
    });

    const fetchCurrency = async () => {
        try {
            const res = await fetch(`${currencyAPI}/currencies`);
            const data = await res.json();

            setCurrencies(Object?.keys(data));
        } catch (error) {
            console.error("Error Fetching", error);
        }
    }

    useEffect(() => {
        fetchCurrency()
    }, [])

    console.log(currencies)

    const handleFavorites = (currency) => {
        let updatedFavorites = [...favorites]

        if (favorites.includes(currency)) {
            updatedFavorites = updatedFavorites.filter((fav) => fav !== currency );
        } else {
            updatedFavorites.push(currency);
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }

    const ConvertCurrency = async () => {
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        if (fromCurrency === toCurrency) {
            alert("Please select different Currencies");
            return;
        }

        setConverting(true)
    
        try  {
            const res = await fetch(`${currencyAPI}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            const data = await res.json();

            setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
        } catch (error) {
            console.error("Error Fetching", error);
            alert("Failed to convert currency. Please try again later.");
        } finally {
            setConverting(false)
        }
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }

    return (
        <div className='w-full max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
            <div className='mb-5 text-2xl font-semibold text-center'>
                Currency Converter
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-2 items-end'>
                <Dropdown 
                    list={currencies} 
                    title='from:'
                    favorites={favorites}
                    handleFavorites={handleFavorites} 
                    selected={fromCurrency}
                    setSelected={setFromCurrency}
                />
                <div className='flex justify-center -mb-3 sm:mb-0'>
                    <button
                        onClick={swapCurrencies}
                        className="p-2 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-300"
                        aria-label="Swap currencies"
                    >
                        <HiArrowsRightLeft className="text-xl text-gray-700 transform rotate-90 sm:transform-none" />
                    </button>
                </div>
                <Dropdown 
                    list={currencies} 
                    title='to:'
                    favorites={favorites}
                    handleFavorites={handleFavorites} 
                    selected={toCurrency}
                    setSelected={setToCurrency}
                />
            </div>
            <div className='mt-4'>
                <InputField 
                    label='Amount'
                    type='number'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <div className='flex justify-end mt-6'>
                    <Button
                        onClick={ConvertCurrency}
                        isLoading={conveting}
                    >
                        Convert
                    </Button>
                </div>
                {convertedAmount && 
                <div className='mt-4 text-lg font-medium text-right text-blue-600'>
                    Converted Amount: {convertedAmount}
                </div>}
            </div>
        </div>
    )
}

export default CurrencyConverter