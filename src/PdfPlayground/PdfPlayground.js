import React, { Component } from 'react'
import { degrees, PDFDocument, rgb, grayscale, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'

import PdfLoader from '../PdfLoader/PdfLoader'
import PdfViewport from './PdfRenderer/PdfViewport'

import styles from './PdfPlayground.module.css'

const url = `${process.env.PUBLIC_URL}/example.pdf`

class PdfPlayground extends Component {
  state = {
    data: null
  }

  loadPdf = async () => {
    const pdfBytes = await fetch(url).then(res => res.arrayBuffer())
    this.setState({
      data: pdfBytes
    })
    console.log('original loaded')
  }

  drawRect = async (x, y) => {
    console.log('viewport pos:', [x, y])
    const pdfDoc = await PDFDocument.load(this.state.data)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    // firstPage.drawText('This text was added with JavaScript!', {
    //   x,
    //   y: height - (y - 80),
    //   size: 25,
    //   font: helveticaFont,
    //   color: rgb(0.95, 0.1, 0.1),
    //   rotate: degrees(-45)
    // })
    const size = 20
    firstPage.drawSquare({
      x,
      y: height - y - size,
      size,
      // rotate: degrees(-15),
      borderWidth: 2,
      borderColor: grayscale(0.5),
      color: rgb(0.75, 0.2, 0.2)
    })
    const modifiedPdfBytes = await pdfDoc.save()
    this.setState({
      data: modifiedPdfBytes
    })
    console.log('modified loaded')
  }

  download = () => {
    const blob = new Blob([this.state.data], { type: 'application/pdf' })
    console.log('request to download file accepted', blob)
    saveAs(blob, 'output.pdf')
  }

  onPdfLoad = data => {
    this.setState({ data })
  }

  render() {
    if (this.state.data === null) {
      this.loadPdf()
    }
    return (
      <div className={styles.container}>
        <h1>PDF Playground</h1>
        <PdfLoader onLoad={this.onPdfLoad} />
        <p>Click on the document to add small rectangles to it</p>
        <div>
          <button onClick={this.download}>Download</button>
        </div>
        {this.state.data !== null ? (
          <PdfViewport
            data={this.state.data}
            pageNum={1}
            scale={1}
            onClick={(event, { x, y }) => this.drawRect(x, y)}
            className={styles.viewport}
          />
        ) : null}
      </div>
    )
  }
}

export default PdfPlayground
