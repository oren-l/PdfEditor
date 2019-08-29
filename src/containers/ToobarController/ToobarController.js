import { useContext } from 'react'
import { saveAs } from 'file-saver'

import { FileContext } from '../../context/file-context'
import { ViewportContext } from '../../context/viewport-context'
import { CounterContext } from '../../context/counter-context'

function download(data) {
  const blob = new Blob([data], { type: 'application/pdf' })
  console.log('request to download file accepted', blob)
  saveAs(blob, 'output.pdf')
}

function ToolbarController({ children }) {
  const { data: fileData, isFileLoaded } = useContext(FileContext)
  const { scale, setScale } = useContext(ViewportContext)
  const { counter } = useContext(CounterContext)
  const onZoomChange = amount => setScale(scale => scale + amount)

  return children({
    disabled: isFileLoaded() === false,
    scale,
    onZoomChange,
    counter,
    onDownload: () => download(fileData)
  })
}

export default ToolbarController
