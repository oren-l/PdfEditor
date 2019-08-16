import React, { Component } from 'react'
import { degrees, PDFDocument, rgb, grayscale, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'

import PdfLoader from '../PdfLoader/PdfLoader'
import PdfViewport from './PdfRenderer/PdfViewport'
import Toolbar from './Toolbar/Toolbar'
import EscKeyHandler from '../EscKeyHandler/EscKeyHandler'

import styles from './PdfPlayground.module.css'

const initialScale = 1

class PdfPlayground extends Component {
  state = {
    data: null,
    scale: initialScale,
    showLoadDialog: true
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
      x: x / this.state.scale,
      y: height - y / this.state.scale - size,
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

  onDownload = () => {
    const blob = new Blob([this.state.data], { type: 'application/pdf' })
    console.log('request to download file accepted', blob)
    saveAs(blob, 'output.pdf')
  }

  onPdfLoad = data => {
    this.setState({ data, showLoadDialog: false, scale: initialScale })
  }

  onOpenLoadDialog = () => {
    this.setState({
      showLoadDialog: true
    })
  }

  onZoomChange = amount => {
    this.setState(state => ({
      scale: state.scale + amount
    }))
  }

  onCloseLoadDialog = () => {
    this.setState({ showLoadDialog: false })
  }

  render() {
    const isReload =
      this.state.data !== null && this.state.showLoadDialog === true
    return (
      <div className={styles.screenViewport}>
        {isReload ? <EscKeyHandler onClick={this.onCloseLoadDialog} /> : null}
        <h1>PDF Playground</h1>

        <p>Click on the document to add small rectangles to it</p>
        <div className={styles.editorArea}>
          <Toolbar
            disabled={this.state.data === null}
            scale={this.state.scale}
            onZoomChange={this.onZoomChange}
            onDownload={this.onDownload}
            onLoad={this.onOpenLoadDialog}
          />
          <div className={styles.pdfViewportArea}>
            {this.state.showLoadDialog ? (
              <PdfLoader onLoad={this.onPdfLoad} />
            ) : null}
            <PdfViewport
              data={this.state.data}
              pageNum={1}
              scale={this.state.scale}
              onClick={(event, { x, y }) => this.drawRect(x, y)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default PdfPlayground
