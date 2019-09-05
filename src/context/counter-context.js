import React, { useState, createContext } from 'react'

const initialCounter = 2

export const CounterContext = createContext({
  counter: initialCounter,
  resetCounter: () => {},
  incrementCounter: () => {},
  decrementCounter: () => {}
})

export default ({ children }) => {
  const [counter, setCounter] = useState(initialCounter)
  const resetCounter = () => setCounter(initialCounter)
  const incrementCounter = () => setCounter(counter => counter + 1)
  const decrementCounter = () => setCounter(counter => counter - 1)
  return (
    <CounterContext.Provider
      value={{ counter, resetCounter, incrementCounter, decrementCounter }}
    >
      {children}
    </CounterContext.Provider>
  )
}
