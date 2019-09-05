import { useContext } from 'react'
import { saveAs } from 'file-saver'
import { PDFDocument, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'

import { FileContext } from '../../context/file-context'
import { ViewportContext } from '../../context/viewport-context'
import { CounterContext } from '../../context/counter-context'
import { ModificationContext } from '../../context/modification-context'

async function download(fileData, modificationList) {
  const pdfDoc = await PDFDocument.load(fileData)
  const fontUrl = `${process.env.PUBLIC_URL}/fonts/Roboto/Roboto-Regular.ttf`
  pdfDoc.registerFontkit(fontkit)
  const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer())
  console.log('font loaded: ', fontBytes)
  const font = await pdfDoc.embedFont(fontBytes)
  const [firstPage] = pdfDoc.getPages()
  const { height } = firstPage.getSize()
  modificationList.forEach(item => {
    firstPage.drawText(item.template(item.value), {
      x: item.position.x,
      y: height - (item.position.y + item.size),
      size: item.size,
      font,
      color: rgb(0, 0, 1)
    })
  })
  const modifiedData = await pdfDoc.save()

  const blob = new Blob([modifiedData], { type: 'application/pdf' })
  console.log('request to download file accepted', blob)
  saveAs(blob, 'output.pdf')
}

function ToolbarController({ children }) {
  const { data: fileData, isFileLoaded } = useContext(FileContext)
  const { scale, setScale } = useContext(ViewportContext)
  const { counter } = useContext(CounterContext)
  const { modList } = useContext(ModificationContext)
  const onZoomChange = amount => setScale(scale => scale + amount)

  return children({
    disabled: isFileLoaded() === false,
    scale,
    onZoomChange,
    counter,
    onDownload: () => download(fileData, modList)
  })
}

export default ToolbarController
