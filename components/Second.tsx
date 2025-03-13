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
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + 'url/all/shorts/')
        if (!response.ok) {
          throw new Error('Failed to fetch URLs')
        }
        const data = await response.json()
        setShortUrls(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching URLs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUrls()
  }, [])

  const handleCopy = async (hash: string) => {
    const shortUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}${hash}/`
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopiedHash(hash)
      setTimeout(() => setCopiedHash(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
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
                    >
                      {shortUrl.url}
                    </a>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 font-mono text-sm">Shortened URL</p>
                    <div className="flex items-center gap-2">
                      <a 
                        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${shortUrl.hash}/`}
                        className="text-green-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {shortUrl.hash}
                      </a>
                      <button
                        onClick={() => handleCopy(shortUrl.hash)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {copiedHash === shortUrl.hash ? (
                          <span className="text-green-400">Copied!</span>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
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