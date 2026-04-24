import { useState } from 'react'

function App() {
  return (
    <div className="min-h-screen bg-pantera text-white font-sans">
      <header className="p-6 border-b border-young-king/30 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gradient">MYKE TOWERS</h1>
        <nav>
          <ul className="flex gap-6 text-sm uppercase tracking-widest font-semibold">
            <li className="hover:text-young-king cursor-pointer transition">Home</li>
            <li className="hover:text-young-king cursor-pointer transition">Music</li>
            <li className="hover:text-young-king cursor-pointer transition">History</li>
          </ul>
        </nav>
      </header>
      
      <main className="container mx-auto py-20 px-6 text-center">
        <h2 className="text-6xl font-black mb-6 leading-tight">
          WELCOME TO THE <br />
          <span className="text-gradient">YOUNG KING</span> UNIVERSE
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Explore the music, story, and statistics of the panther of reggaeton.
        </p>
        <div className="mt-10">
          <button className="bg-young-king hover:bg-young-king-light text-black font-bold py-3 px-8 rounded-full transition transform hover:scale-105">
            START EXPLORING
          </button>
        </div>
      </main>

      <footer className="py-10 border-t border-young-king/10 text-center text-gray-600 text-sm">
        &copy; 2024 MYKE TOWERS FAN EXPERIENCE. ALL RIGHTS RESERVED.
      </footer>
    </div>
  )
}

export default App
