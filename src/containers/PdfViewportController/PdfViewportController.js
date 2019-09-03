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
  const size = 20
  addModification({
    position: {
      x: position.x / scale - size / 2,
      y: position.y / scale - size / 2
    },
    size,
    content: `{${counter}}`
  })
  incrementCounter()
}

function PdfViewportController({ children }) {
  const { data, setData: setFileData } = useContext(FileContext)
  const { scale } = useContext(ViewportContext)
  const { counter, incrementCounter } = useContext(CounterContext)
  const { modList, addMod: addModification, changeMod } = useContext(
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
        incrementCounter
      ),
    onDragEnd: (event, position, id) => {
      changeMod(id, mod => ({
        ...mod,
        position: {
          x: position.x / scale - mod.size / 2,
          y: position.y / scale - mod.size / 2
        }
      }))
    }
  })
}

export default PdfViewportController
