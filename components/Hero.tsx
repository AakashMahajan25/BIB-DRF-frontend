"use client"
import React, { useState } from 'react'
import { toast } from 'sonner'

const Hero = () => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!url) return
    
    setIsLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url })
      })
      
      if (!response.ok) {
        throw new Error('Failed to shorten URL')
      }

      const data = await response.json()
      toast.success('URL shortened successfully!')
      console.log(data) // Handle the shortened URL response
      
    } catch (error) {
      console.error('Error shortening URL:', error)
      toast.error('Failed to shorten URL. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="w-full flex flex-col items-center justify-center pt-56 py-12 bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className='text-blue-400'>Shorten</span> Your Links, <span className="text-green-400">Expand</span> Your Reach
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Transform lengthy URLs into concise, powerful links that drive engagement and track performance.
        </p>
        <div className="w-full max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
          <input 
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your URL here..."
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
          />
          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-8 py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero