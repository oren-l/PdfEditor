import React, { useRef, useState } from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler'

import OverlayItem from './OverlayItem'

import styles from '../PdfViewport.module.css'

function getRelativeMousePos(element, event) {
  const { left, top } = element.getBoundingClientRect()
  return {
    x: event.clientX - left,
    y: event.clientY - top
  }
}

function Overlay({ items, scale, onItemMove, onItemDelete }) {
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
      <KeyboardEventHandler
        handleKeys={['delete']}
        handleEventType="keyup"
        onKeyEvent={() => {
          if (selectedItemId !== null) {
            onItemDelete(selectedItemId)
            setSelectedItemId(null)
          }
        }}
      />
      {items.map(item => (
        <OverlayItem
          key={item.id}
          className={styles.item}
          position={item.position}
          size={item.size}
          value={item.value}
          scale={scale}
          template={item.template}
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
