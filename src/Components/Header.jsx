import React from 'react'

export default function Header({ cartCount = 0 }) {
  return (
    <header className="sticky top-0 z-[100] flex items-center justify-between border-b border-gray-200 bg-white px-8 py-3">
      <div>
        <h1 className="m-0 text-3xl font-bold text-[#f7c600]">
          blink<span className="text-[#0c831f]">it</span>
        </h1>
      </div>

      <div className="ml-5 flex flex-col">
        <span className="text-lg font-bold">Delivery in 8 minutes</span>
        <span className="text-sm text-gray-600">Uttardhona, Uttar Pradesh ▼</span>
      </div>

      <div className="mx-8 flex-1">
        <input
          type="text"
          placeholder='Search "milk", "bread", "eggs"...'
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-[15px] outline-none focus:border-green-600"
        />
      </div>

      <button className="mr-5 bg-white text-lg cursor-pointer">Login</button>

      <button className="cursor-pointer rounded-lg bg-[#0c831f] px-5 py-3 text-white">
        🛒 Cart ({cartCount})
      </button>
    </header>
  )
}
