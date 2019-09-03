import { useContext } from 'react'
import { saveAs } from 'file-saver'
import { degrees, PDFDocument, rgb, grayscale, StandardFonts } from 'pdf-lib'

import { FileContext } from '../../context/file-context'
import { ViewportContext } from '../../context/viewport-context'
import { CounterContext } from '../../context/counter-context'
import { ModificationContext } from '../../context/modification-context'

async function download(fileData, modificationList) {
  const pdfDoc = await PDFDocument.load(fileData)
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const [firstPage] = pdfDoc.getPages()
  const { height } = firstPage.getSize()
  modificationList.forEach(item => {
    firstPage.drawText(item.content, {
      x: item.position.x,
      y: height - (item.position.y + item.size),
      size: item.size,
      font,
      color: rgb(1, 0, 0)
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
