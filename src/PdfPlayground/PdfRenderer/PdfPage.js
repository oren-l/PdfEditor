import React, { Component } from 'react'

function loadPage(doc, pageNum) {
  return doc.getPage(pageNum)
}

class PdfPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageObj: null
    }
  }

  async componentDidMount() {
    const { document, pageNum } = this.props
    const pageObj = await loadPage(document, pageNum)
    this.setState({
      pageObj
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    const { document, pageNum } = this.props
    // will update state only when one of the props changes
    if (document !== prevProps.document || pageNum !== prevProps.pageNum) {
      const pageObj = await loadPage(document, pageNum)
      this.setState({
        pageObj
      })
    }
  }

  render() {
    const { children } = this.props
    return this.state.pageObj !== null ? children(this.state.pageObj) : null
  }
}

export default PdfPage
