import React from 'react'
import PdfDoc from './PdfDoc'
import PdfPage from './PdfPage'
import PdfCanvas from './PdfCanvas'

function PdfViewport({ data, pageNum, scale, ...otherProps }) {
  return (
    <div>
      <div>
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
