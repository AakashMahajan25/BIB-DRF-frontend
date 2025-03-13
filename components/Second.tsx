"use client"
import React, { useEffect, useState } from 'react'

interface ShortUrl {
  hash: string;
  url: string;
  visits: number;
}

const Second = () => {
  const [shortUrls, setShortUrls] = useState<ShortUrl[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchUrls = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + 'url/all/shorts/')
      if (!response.ok) {
        throw new Error('Failed to fetch URLs')
      }
      const data = await response.json()
      setShortUrls(data)
    } catch (error) {
      console.error('Error fetching URLs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUrls()
  }, [])

  const handleLinkClick = () => {
    // Add small delay to allow the visit count to update on backend
    setTimeout(() => {
      fetchUrls()
    }, 100)
  }

  return (
    <section className="w-ful pt-24 py-12 bg-black">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-white">Previous Links</h2>
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-white">Loading...</div>
          ) : shortUrls.length === 0 ? (
            <div className="text-white">No shortened URLs found</div>
          ) : (
            shortUrls.map((shortUrl) => (
              <div key={shortUrl.hash} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 font-mono text-sm">Original URL</p>
                    <a 
                      href={shortUrl.url}
                      className="text-blue-400 hover:underline truncate"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                    >
                      {shortUrl.url}
                    </a>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 font-mono text-sm">Shortened URL</p>
                    <div>
                      <a 
                        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${shortUrl.hash}/`}
                        className="text-green-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleLinkClick}
                      >
                        {shortUrl.hash}
                      </a>
                      <p className="text-gray-400 text-sm mt-1">Visits: {shortUrl.visits}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Second