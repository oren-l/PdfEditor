import { useContext } from 'react'

import { FileContext } from '../../context/file-context'
import { ViewportContext } from '../../context/viewport-context'
import { CounterContext } from '../../context/counter-context'
import { ModificationContext } from '../../context/modification-context'

function placeRunningCounter(
  scale,
  counter,
  position,
  addModification,
  incrementCounter,
  size
) {
  const template = value => `(${value})`
  addModification({
    position: {
      x: position.x / scale - size / 2,
      y: position.y / scale - size / 2
    },
    size,
    value: counter,
    template
  })
  incrementCounter()
}

function PdfViewportController({ children }) {
  const { data } = useContext(FileContext)
  const { scale, fontSize } = useContext(ViewportContext)
  const { counter, incrementCounter, decrementCounter } = useContext(
    CounterContext
  )
  const { modList, addMod: addModification, changeMod, removeMod } = useContext(
    ModificationContext
  )

  return children({
    data,
    pageNum: 1,
    scale,
    overlayItems: modList,
    onClick: (event, position) =>
      placeRunningCounter(
        scale,
        counter,
        position,
        addModification,
        incrementCounter,
        fontSize
      ),
    onItemMove: (event, position, id) => {
      changeMod(id, mod => ({
        ...mod,
        position: {
          x: position.x / scale - mod.size / 2,
          y: position.y / scale - mod.size / 2
        }
      }))
    },
    onItemDelete: id => {
      removeMod(id)
      decrementCounter()
    },
    fontSize
  })
}

export default PdfViewportController
