import { useContext } from 'react'
import { degrees, PDFDocument, rgb, grayscale, StandardFonts } from 'pdf-lib'

import { FileContext } from '../../context/file-context'
import { ViewportContext } from '../../context/viewport-context'
import { CounterContext } from '../../context/counter-context'

async function placeRunningCounter(
  fileData,
  scale,
  counter,
  { x, y },
  setFileData,
  incrementCounter
) {
  const pdfDoc = await PDFDocument.load(fileData)
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const [firstPage] = pdfDoc.getPages()
  const { height } = firstPage.getSize()
  const size = 20
  firstPage.drawText(`{${counter}}`, {
    x: x / scale,
    y: height - y / scale - size,
    size,
    font,
    color: rgb(0.95, 0.1, 0.1)
    // rotate: degrees(-45)
  })
  const modifiedPdfBytes = await pdfDoc.save()
  setFileData(modifiedPdfBytes)
  incrementCounter()
  console.log('placeRunningCounter:', counter, { x, y })
}

function PdfViewportController({ children }) {
  const { data, setData: setFileData } = useContext(FileContext)
  const { scale } = useContext(ViewportContext)
  const { counter, incrementCounter } = useContext(CounterContext)

  return children({
    data,
    pageNum: 1,
    scale,
    onClick: (event, position) =>
      placeRunningCounter(
        data,
        scale,
        counter,
        position,
        setFileData,
        incrementCounter
      )
  })
}

export default PdfViewportController
