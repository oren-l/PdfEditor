import React, { useState, createContext } from 'react'

export const CounterContext = createContext({
  counter: 0,
  initialCounter: 0,
  resetCounter: () => {},
  setInitialCounter: () => {},
  incrementCounter: () => {},
  decrementCounter: () => {}
})

export default ({ children }) => {
  const [initialCounter, setInitialCounter] = useState(2)
  const [counter, setCounter] = useState(initialCounter)
  const resetCounter = () => setCounter(initialCounter)
  const incrementCounter = () => setCounter(counter => counter + 1)
  const decrementCounter = () => setCounter(counter => counter - 1)
  return (
    <CounterContext.Provider
      value={{ counter, initialCounter, resetCounter, setInitialCounter, incrementCounter, decrementCounter }}
    >
      {children}
    </CounterContext.Provider>
  )
}
