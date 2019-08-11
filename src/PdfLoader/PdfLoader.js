import React, { Component } from 'react'
import Files from 'react-files'

import styles from './PdfLoader.module.css'

class PdfLoader extends Component {
  onFilesChange = async files => {
    console.log('got request to load files:', files)
    const file = files[0]
    const data = await file.arrayBuffer()
    console.log('data:', data)
    this.props.onLoad(data)
  }

  onFilesError = (error, files) => {
    console.warn(`error loading files ${files}. error:`, error)
  }

  render() {
    return (
      <div className={styles.container}>
        <Files
          className={styles.dropzone}
          onChange={this.onFilesChange}
          onError={this.onFilesError}
          accepts={['.pdf']}
          clickable
        >
          Drop a file here or click to upload
        </Files>
      </div>
    )
  }
}

export default PdfLoader
