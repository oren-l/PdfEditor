import React from 'react'
import PdfDoc from './PdfDoc'
import PdfPage from './PdfPage'
import PdfCanvas from './PdfCanvas'
import OverlayItem from './OverlayItem'

import styles from './PdfViewport.module.css'

function PdfViewport({
  data,
  pageNum,
  scale,
  overlayItems,
  className,
  style,
  onClick
}) {
  return (
    <div className={`${className} ${styles.viewport}`} style={style}>
      <div className={styles.page}>
        {data !== null ? (
          <PdfDoc data={data}>
            {doc => (
              <PdfPage document={doc} pageNum={pageNum}>
                {page => (
                  <React.Fragment>
                    <div className={styles.overlay}>
                      {overlayItems.map(item => (
                        <OverlayItem
                          key={item.id}
                          className={styles.item}
                          position={item.position}
                          size={item.size}
                          content={item.content}
                          scale={scale}
                        />
                      ))}
                    </div>
                    <PdfCanvas page={page} scale={scale} onClick={onClick} />
                  </React.Fragment>
                )}
              </PdfPage>
            )}
          </PdfDoc>
        ) : null}
      </div>
    </div>
  )
}

export default PdfViewport
