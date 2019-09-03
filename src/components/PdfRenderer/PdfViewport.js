import React, { useRef } from 'react'
import PdfDoc from './PdfDoc'
import PdfPage from './PdfPage'
import PdfCanvas from './PdfCanvas'
import OverlayItem from './OverlayItem'

import styles from './PdfViewport.module.css'

function getRelativeMousePos(element, event) {
  const { left, top } = element.getBoundingClientRect()
  return {
    x: event.clientX - left,
    y: event.clientY - top
  }
}

function PdfViewport({
  data,
  pageNum,
  scale,
  overlayItems,
  className,
  style,
  onClick,
  onDragEnd
}) {
  const overlayRef = useRef(null)
  return (
    <div className={`${className} ${styles.viewport}`} style={style}>
      <div className={styles.page}>
        {data !== null ? (
          <PdfDoc data={data}>
            {doc => (
              <PdfPage document={doc} pageNum={pageNum}>
                {page => (
                  <React.Fragment>
                    <div ref={overlayRef} className={styles.overlay}>
                      {overlayItems.map(item => (
                        <OverlayItem
                          key={item.id}
                          className={styles.item}
                          position={item.position}
                          size={item.size}
                          content={item.content}
                          scale={scale}
                          draggable
                          // onDragStart={event => {
                          //   console.log(`item #${item.id} drag`, [
                          //     event.clientX,
                          //     event.clientY
                          //   ])
                          // }}
                          onDragEnd={event =>
                            onDragEnd(
                              event,
                              getRelativeMousePos(overlayRef.current, event),
                              item.id
                            )
                          }
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
