import React from 'react'
import CurrencyConverter from './components/CurrencyConverter'

function App() {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
      <div className='container px-4'>
        <CurrencyConverter />
      </div>
    </div>
  )
}

export default App