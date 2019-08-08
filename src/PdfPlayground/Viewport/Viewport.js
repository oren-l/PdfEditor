import React, { Component } from 'react'
import pdfjs from '@bundled-es-modules/pdfjs-dist/build/pdf'

class Viewport extends Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    window.pdfjs = pdfjs
    window.canvasRef = this.canvasRef
  }

  renderAsync = async data => {
    const doc = await pdfjs.getDocument(data).promise
    const page = await doc.getPage(1)
    const viewport = page.getViewport({ scale: 1 })
    const canvas = this.canvasRef.current

    canvas.width = viewport.width // canvas width and height must be according to viewport scale!
    canvas.height = viewport.height
    window.page = page
    page.render({
      canvasContext: this.canvasRef.current.getContext('2d'),
      viewport
    })
  }

  updatePointerPos = (x, y) => {
    console.log('viewport pos:', [x, y])
  }

  render() {
    const { data } = this.props
    window.data = data
    this.renderAsync(data)
    console.log('viewport data:', data)

    return (
      <canvas
        ref={this.canvasRef}
        onMouseMove={event =>
          this.updatePointerPos(event.clientX, event.clientY)
        }
      />
    )
  }
}

export default Viewport
