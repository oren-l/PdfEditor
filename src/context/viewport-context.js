import React, { useState, createContext } from 'react'

const initialScale = 1
export const ViewportContext = createContext({
  scale: initialScale,
  setScale: () => {},
  resetScale: () => {}
})

export default ({ children }) => {
  const [scale, setScale] = useState(initialScale)
  const resetScale = () => setScale(initialScale)
  return (
    <ViewportContext.Provider value={{ scale, setScale, resetScale }}>
      {children}
    </ViewportContext.Provider>
  )
}
