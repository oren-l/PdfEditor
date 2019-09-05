import React, { useState, createContext } from 'react'

const initialModList = []
const initialId = 0

export const ModificationContext = createContext({
  modList: initialModList,
  resetModList: () => {},
  addMod: () => {},
  changeMod: (id, changeFunc) => {},
  removeMod: id => {}
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

  const changeMod = (id, changeFunc) => {
    const changedModList = modList.map(mod =>
      mod.id !== id ? mod : changeFunc(mod)
    )

    setModList(changedModList)
  }

  const removeMod = id => {
    const changedModList = modList
      .filter(mod => mod.id !== id)
      .map(mod => (mod.id < id ? mod : { ...mod, value: mod.value - 1 }))
    setModList(changedModList)
  }

  return (
    <ModificationContext.Provider
      value={{
        modList,
        resetModList,
        addMod,
        changeMod,
        removeMod
      }}
    >
      {children}
    </ModificationContext.Provider>
  )
}
