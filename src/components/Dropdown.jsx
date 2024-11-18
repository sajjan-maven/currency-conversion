import React from 'react'
import { HiOutlineStar, HiStar } from 'react-icons/hi2'
function Dropdown({
        list,
        title='',
        favorites,
        handleFavorites,
        selected,
        setSelected
    }) {

    const isFavorite = (item) => favorites.includes(item);

    return (
        <div>
            <label 
                htmlFor={title}
                className='block text-sm font-medium text-gray-700'
            >
                {title}
            </label>
            <div className='mt-1 relative'>
                <select id={title} value={selected} onChange={(e) => setSelected(e.target.value)} className='w-full flex-1 p-2 border-b border-gray-300 rounded-md bg-white shadow-sm
                    focus:outline-none focus:right-2 focus:ring-indigo-500'>
                    {favorites?.map((item) => {
                        return (
                            <option className='bg-gray-200' value={item} key={item} >
                                {item}
                            </option>
                        )
                    })}
                    {list?.filter((i) => !favorites.includes(i)).map((item) => {
                        return (
                            <option className='block py-3' value={item} key={item} >
                                {item}
                            </option>
                        )
                    })}
                </select>
                <button
                    onClick={() => handleFavorites(selected)}
                    className='absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5'>
                    {isFavorite(selected) ? <HiStar /> : <HiOutlineStar />}
                </button>
            </div>
        </div>
    )
}

export default Dropdown