import React from 'react'

const Second = () => {
  return (
    <section className="w-ful pt-24 py-12 bg-black">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-white">Previous Links</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 font-mono text-sm">Original URL</p>
                <a href="#" className="text-blue-400 hover:underline truncate">https://example.com/very/long/url/that/needs/shortening</a>
              </div>
              <div className="text-right">
                <p className="text-gray-400 font-mono text-sm">Shortened URL</p>
                <a href="#" className="text-green-400 hover:underline">short.ly/abc123</a>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 font-mono text-sm">Original URL</p>
                <a href="#" className="text-blue-400 hover:underline truncate">https://anotherexample.com/path/to/page</a>
              </div>
              <div className="text-right">
                <p className="text-gray-400 font-mono text-sm">Shortened URL</p>
                <a href="#" className="text-green-400 hover:underline">short.ly/xyz789</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Second