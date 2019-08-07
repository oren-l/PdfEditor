import React, { Component } from 'react'
import { PDFDocument } from 'pdf-lib'

import Viewport from './Viewport/Viewport'

const url = `${process.env.PUBLIC_URL}/example.pdf`

class PdfPlayground extends Component {
  state = {
    status: 'idle',
    data: ''
  }

  loadPdf = async () => {
    this.setState({
      status: 'loading'
    })
    const pdfBytes = await fetch(url).then(res => res.arrayBuffer())
    console.log('pdfBytes:', pdfBytes)
    // const pdfDoc = await PDFDocument.load(pdfBytes)
    // const dataB64 = await pdfDoc.saveAsBase64({ dataUri: true })
    // console.log('dataB64:', dataB64)
    this.setState({
      status: 'done',
      data: pdfBytes
    })
  }

  render() {
    if (this.state.status === 'idle') {
      this.loadPdf()
    }
    return (
      <div>
        <h1>PDF Playground</h1>
        <p>status: {this.state.status}</p>
        {this.state.status === 'done' ? (
          <Viewport data={this.state.data} />
        ) : null}
      </div>
    )
  }
}

export default PdfPlayground
