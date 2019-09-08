import { useContext } from 'react'
import { saveAs } from 'file-saver'
import { PDFDocument, rgb, degrees } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'

import { FileContext } from '../../context/file-context'
import { ViewportContext } from '../../context/viewport-context'
import { CounterContext } from '../../context/counter-context'
import { ModificationContext } from '../../context/modification-context'

const getPositiveAngle = angle => ((angle % 360) + 360) % 360

function translatePos(angle, x, y, width, height) {
  switch (angle) {
    case 0:
      return { x, y }
    case 90:
      return { x: y, y: height - x }
    case 180:
      return { x: width - x, y: height - y }
    case 270:
      return { x: width - y, y: x }
  }
}

async function download(fileData, modificationList) {
  const pdfDoc = await PDFDocument.load(fileData)
  const fontUrl = `${process.env.PUBLIC_URL}/fonts/Roboto/Roboto-Regular.ttf`
  pdfDoc.registerFontkit(fontkit)
  const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer())
  console.log('font loaded: ', fontBytes)
  const font = await pdfDoc.embedFont(fontBytes)
  const [firstPage] = pdfDoc.getPages()
  const { width, height } = firstPage.getSize()
  const originalAngle = firstPage.getRotation().angle
  const angle = getPositiveAngle(originalAngle)
  console.log(`original: ${originalAngle} angle: ${angle}`)

  modificationList.forEach(item => {
    const position = translatePos(
      angle,
      item.position.x,
      item.position.y + item.size,
      width,
      height
    )
    firstPage.drawText(item.template(item.value), {
      x: position.x,
      y: height - position.y,
      rotate: degrees(angle),
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

async function rotate(fileData, setFileData, angle) {
  const pdfDoc = await PDFDocument.load(fileData)
  const [firstPage] = pdfDoc.getPages()
  const currAngle = firstPage.getRotation().angle
  firstPage.setRotation(degrees(currAngle + angle))
  const modifiedData = await pdfDoc.save()
  setFileData(modifiedData)
}

function ToolbarController({ children }) {
  const { data: fileData, isFileLoaded, setData: setFileData } = useContext(
    FileContext
  )
  const { scale, setScale } = useContext(ViewportContext)
  const { counter, resetCounter } = useContext(CounterContext)
  const { modList, resetModList } = useContext(ModificationContext)
  const onZoomChange = amount => setScale(scale => scale + amount)

  return children({
    disabled: isFileLoaded() === false,
    scale,
    onZoomChange,
    onRotate: angle => {
      if (modList.length !== 0) {
        const result = window.confirm('Warning: all changes will be lost') // TODO: replace this with a proper modal
        if (result === false) {
          return // cancel rotation
        }
      }
      rotate(fileData, setFileData, angle)
      resetModList()
      resetCounter()
    },
    counter,
    onDownload: () => download(fileData, modList)
  })
}

export default ToolbarController
