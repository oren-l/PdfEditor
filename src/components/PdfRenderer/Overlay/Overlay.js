import React, { useRef } from 'react'

import OverlayItem from './OverlayItem'

import styles from '../PdfViewport.module.css'

function getRelativeMousePos(element, event) {
  const { left, top } = element.getBoundingClientRect()
  return {
    x: event.clientX - left,
    y: event.clientY - top
  }
}

function Overlay({ items, scale, onItemMove }) {
  const overlayRef = useRef(null)
  return (
    <div ref={overlayRef} className={styles.overlay}>
      {items.map(item => (
        <OverlayItem
          key={item.id}
          className={styles.item}
          position={item.position}
          size={item.size}
          content={item.content}
          scale={scale}
          draggable
          onDragEnd={event =>
            onItemMove(
              event,
              getRelativeMousePos(overlayRef.current, event),
              item.id
            )
          }
        />
      ))}
    </div>
  )
}

export default Overlay
