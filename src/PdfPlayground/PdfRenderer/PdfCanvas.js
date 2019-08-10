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

  // drawDot = event => {
  //   const { x, y } = this.getMousePos(event.clientX, event.clientY)
  //   const canvas = this.canvasRef.current
  //   const ctx = canvas.getContext('2d')
  //   ctx.fillRect(x, y, 2, 2)
  // }

  getMousePos = (x, y) => {
    // get mouse position relative to canvas
    const canvas = this.canvasRef.current
    const { left, top } = canvas.getBoundingClientRect()
    return {
      x: x - left,
      y: y - top
    }
  }

  render() {
    const { page, scale, onClick, ...otherProps } = this.props
    if (onClick instanceof Function) {
      otherProps.onClick = event => {
        return this.props.onClick(
          event,
          this.getMousePos(event.clientX, event.clientY)
        )
      }
    }
    otherProps.style = otherProps.style || {}
    otherProps.style.cursor = 'crosshair'
    return <canvas ref={this.canvasRef} {...otherProps} />
  }
}

export default PdfCanvas
