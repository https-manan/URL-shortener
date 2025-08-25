import { useState } from "react"
import axios from "axios"
import "./App.css"

function App() {
  const [shortId, setShortId] = useState("")
  const [redirectUrl, setRedirectUrl] = useState("")

  async function onClickHandler() {
    try {
      const res = await axios.post("http://localhost:8080/url", {
        url: redirectUrl,
      })
      setShortId(res.data.id)
    } catch (error) {
      console.error("Error generating short URL:", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          URL Shortener
        </h1>

        <input
          type="text"
          placeholder="Enter your URL"
          className="w-full border border-yellow-400 text-yellow-300 bg-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4 placeholder-yellow-500"
          onChange={(e) => setRedirectUrl(e.target.value)}
          value={redirectUrl}
        />

        <button
          onClick={onClickHandler}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-lg transition"
        >
          Generate Short URL
        </button>

        <div className="mt-4 text-center">
          {shortId ? (
            <a
              href={`http://localhost:8080/${shortId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-300 underline hover:text-yellow-400"
            >
              Your short URL is: {`http://localhost:8080/${shortId}`}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default App
