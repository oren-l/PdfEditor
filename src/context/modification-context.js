import React, { useState, createContext } from 'react'

const initialModList = []
const initialId = 0

export const ModificationContext = createContext({
  modList: initialModList,
  resetModList: () => {},
  addMod: () => {}
  // remove: () => {}
})

export default ({ children }) => {
  const [modList, setModList] = useState(initialModList)
  const [nextId, setNextId] = useState(initialId)
  const resetModList = () => {
    setModList(initialModList)
    setNextId(initialId)
  }

  const addMod = mod => {
    setNextId(id => id + 1)
    return setModList(modList => [
      ...modList,
      {
        ...mod,
        id: nextId
      }
    ])
  }

  // TODO: remove mod
  return (
    <ModificationContext.Provider
      value={{
        modList,
        resetModList,
        addMod
      }}
    >
      {children}
    </ModificationContext.Provider>
  )
}
