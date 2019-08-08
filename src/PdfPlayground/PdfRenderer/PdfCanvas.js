import React, { Component } from 'react'

function renderPdfToCanvas(canvasEl, page, scale) {
  const viewport = page.getViewport({ scale })

  canvasEl.width = viewport.width // canvas width and height must be according to viewport scale!
  canvasEl.height = viewport.height

  page.render({
    canvasContext: canvasEl.getContext('2d'),
    viewport
  })
}

class PdfCanvas extends Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    const { page, scale } = this.props
    renderPdfToCanvas(this.canvasRef.current, page, scale)
  }

  componentDidUpdate() {
    const { page, scale } = this.props
    renderPdfToCanvas(this.canvasRef.current, page, scale)
  }

  render() {
    const { page, scale, ...otherProps } = this.props
    return <canvas ref={this.canvasRef} {...otherProps} />
  }
}

export default PdfCanvas
