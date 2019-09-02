import React from 'react'

function OverlayItem({ position, size, content, scale, className }) {
  return (
    <div
      className={className}
      style={{
        left: `${position.x * scale}px`,
        top: `${position.y * scale}px`,
        fontSize: `${size * scale}px`
      }}
    >
      {content}
    </div>
  )
}

export default React.memo(OverlayItem)
