import React, { Component } from 'react'
import { degrees, PDFDocument, rgb, grayscale, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import Files from 'react-files'

import PdfDoc from './PdfRenderer/PdfDoc'
import PdfPage from './PdfRenderer/PdfPage'
import PdfCanvas from './PdfRenderer/PdfCanvas'

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

  onFilesChange = async files => {
    console.log('got request to load files:', files)
    const file = files[0]
    const data = await file.arrayBuffer()
    console.log('data:', data)
    this.setState({
      data
    })
  }

  onFilesError = (error, files) => {
    console.warn(`error loading files ${files}. error:`, error)
  }

  render() {
    if (this.state.data === null) {
      this.loadPdf()
    }
    return (
      <div>
        <h1>PDF Playground</h1>
        <Files
          className="files-dropzone"
          onChange={this.onFilesChange}
          onError={this.onFilesError}
          accepts={['.pdf']}
          clickable
        >
          Drop files here or click to upload
        </Files>
        <p>Click on the document to add small rectangles to it</p>
        <div>
          <button onClick={this.download}>Download</button>
        </div>
        {this.state.data !== null ? (
          <div>
            <PdfDoc data={this.state.data}>
              {doc => (
                <PdfPage document={doc} pageNum={1}>
                  {page => (
                    <PdfCanvas
                      page={page}
                      scale={1}
                      onClick={(event, { x, y }) => this.drawRect(x, y)}
                    />
                  )}
                </PdfPage>
              )}
            </PdfDoc>
          </div>
        ) : null}
      </div>
    )
  }
}

export default PdfPlayground
