import React from 'react'
import './App.css'

import PdfPlayground from '../PdfPlayground/PdfPlayground'
import FileProvider from '../context/file-context'
import PdfEditor from '../components/PdfEditor/PdfEditor'

function App() {
  return (
    <div className="App">
      <FileProvider>
        <PdfEditor />
      </FileProvider>
    </div>
  )
}

export default App
