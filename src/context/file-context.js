import React, { useState, createContext } from 'react'

const NO_FILE_DATA = null
export const initialState = { data: NO_FILE_DATA }
export const FileContext = createContext({
  data: NO_FILE_DATA,
  setData: () => {},
  isFileLoaded: () => {}
})

export default ({ children }) => {
  const [data, setData] = useState(NO_FILE_DATA)
  console.log('[file-context] file data:', data)
  const isFileLoaded = () => data !== NO_FILE_DATA

  return (
    <FileContext.Provider value={{ data, setData, isFileLoaded }}>
      {children}
    </FileContext.Provider>
  )
}
