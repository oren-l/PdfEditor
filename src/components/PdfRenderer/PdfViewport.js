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
  overlayItems,
  ...otherProps
}) {
  return (
    <div className={`${className} ${styles.viewport}`} style={style}>
      <div className={styles.page}>
        {data !== null ? (
          <PdfDoc data={data}>
            {doc => (
              <PdfPage document={doc} pageNum={pageNum}>
                {page => (
                  <div className={styles.overlay}>
                    {overlayItems.map(item => (
                      <div
                        className={styles.element}
                        style={{
                          left: `${item.position.x * scale}px`,
                          top: `${item.position.y * scale}px`,
                          fontSize: `${item.size * scale}px`
                        }}
                        key={item.id}
                      >
                        {item.content}
                      </div>
                    ))}
                    <PdfCanvas page={page} scale={scale} {...otherProps} />
                  </div>
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
