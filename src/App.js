import React from 'react'
import './App.css'

import PdfPlayground from './PdfPlayground/PdfPlayground'

function App() {
  return (
    <div className="App">
      <PdfPlayground preloadUrl={`${process.env.REACT_APP_PRELOAD_DOCUMENT}`} />
    </div>
  )
}

export default App
