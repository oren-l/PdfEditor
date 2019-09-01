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
  incrementCounter
) {
  addModification({
    position: {
      x: position.x / scale,
      y: position.y / scale
    },
    size: 20,
    content: `{${counter}}`
  })
  incrementCounter()
}

function PdfViewportController({ children }) {
  const { data, setData: setFileData } = useContext(FileContext)
  const { scale } = useContext(ViewportContext)
  const { counter, incrementCounter } = useContext(CounterContext)
  const { modList, addMod: addModification } = useContext(ModificationContext)

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
        incrementCounter
      )
  })
}

export default PdfViewportController
