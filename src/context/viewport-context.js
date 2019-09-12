import React, { useState, createContext } from 'react'

const initialScale = 1 // = 100%
const initialFontSize = 12

export const ViewportContext = createContext({
  scale: initialScale,
  setScale: () => {},
  resetScale: () => {},
  fontSize: initialFontSize,
  setFontSize: () => {}
})

export default ({ children }) => {
  const [scale, setScale] = useState(initialScale)
  const [fontSize, setFontSize] = useState(initialFontSize)
  const resetScale = () => setScale(initialScale)

  return (
    <ViewportContext.Provider
      value={{ scale, setScale, resetScale, fontSize, setFontSize }}
    >
      {children}
    </ViewportContext.Provider>
  )
}
