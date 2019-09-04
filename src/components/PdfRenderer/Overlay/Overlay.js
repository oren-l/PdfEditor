import React, { useRef, useState } from 'react'

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
  const [selectedItemId, setSelectedItemId] = useState(null)
  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      style={{
        position: selectedItemId !== null ? 'absolute' : null
      }}
      onClick={() => {
        setSelectedItemId(null)
      }}
    >
      {items.map(item => (
        <OverlayItem
          key={item.id}
          className={styles.item}
          position={item.position}
          size={item.size}
          content={item.content}
          scale={scale}
          onDragEnd={event =>
            onItemMove(
              event,
              getRelativeMousePos(overlayRef.current, event),
              item.id
            )
          }
          isSelected={item.id === selectedItemId}
          onClick={event => {
            setSelectedItemId(item.id)
            event.stopPropagation()
          }}
        />
      ))}
    </div>
  )
}

export default Overlay
