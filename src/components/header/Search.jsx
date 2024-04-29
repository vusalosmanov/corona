import React from 'react'

const Search = () => {
  return (
    <>
     <form className="max-w-[650px] w-full relative flex items-center justify-center flex-row">
      <div className="w-full relative ">
      <div className="absolute inset-y-0 right-0 flex items-center pr-[5px] pointer-events-none text-white">
        <button type='submit'><i className='fa-solid fa-magnifying-glass'></i></button>
      </div>
      <input
        className="bg-transparent border-[2px] border-white rounded-[5px] caret-white text-white text-18 min-h-55 outline-none px-5 w-full h-[55px] placeholder:text-[white]  input"
        type="text"
        name="search"
        placeholder="Axtar"
        // onChange={searchData}
        autoComplete="off"
      />
    </div>
    </form >
    </>
  )
}

export default Search