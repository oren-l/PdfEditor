import React from 'react'

function OverlayItem({
  position,
  size,
  content,
  scale,
  className,
  ...otherProps
}) {
  return (
    <div
      className={className}
      style={{
        left: `${position.x * scale}px`,
        top: `${position.y * scale}px`,
        fontSize: `${size * scale}px`
      }}
      {...otherProps}
    >
      {content}
    </div>
  )
}

export default React.memo(OverlayItem)
