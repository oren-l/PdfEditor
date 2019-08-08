import React, { Component } from 'react'
import pdfjs from '@bundled-es-modules/pdfjs-dist/build/pdf'

function loadDocument(data) {
  return pdfjs.getDocument(data).promise
}

class PdfDoc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      docObj: null,
      prevData: props.data
    }
  }

  async componentDidMount() {
    const docObj = await loadDocument(this.props.data)
    this.setState({
      docObj
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    // will update state only when 'props.data' changes
    if (this.props.data !== prevProps.data) {
      const docObj = await loadDocument(this.props.data)
      this.setState({
        docObj,
        prevData: this.props.data
      })
    }
  }

  render() {
    const { children } = this.props
    return this.state.docObj !== null ? children(this.state.docObj) : null
  }
}

export default PdfDoc
