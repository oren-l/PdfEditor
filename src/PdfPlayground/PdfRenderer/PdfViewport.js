import React from 'react'
import PdfDoc from './PdfDoc'
import PdfPage from './PdfPage'
import PdfCanvas from './PdfCanvas'

import styles from './PdfViewport.module.css'

function PdfViewport({
  data,
  pageNum,
  scale,
  className,
  style,
  ...otherProps
}) {
  return (
    <div className={`${className} ${styles.viewport}`} style={style}>
      <div className={styles.page}>
        <PdfDoc data={data}>
          {doc => (
            <PdfPage document={doc} pageNum={pageNum}>
              {page => <PdfCanvas page={page} scale={scale} {...otherProps} />}
            </PdfPage>
          )}
        </PdfDoc>
      </div>
    </div>
  )
}

export default PdfViewport
