import React from 'react'

function OverlayItem({
  position,
  size,
  content,
  scale,
  className,
  isSelected,
  ...otherProps
}) {
  return (
    <div
      className={className}
      style={{
        left: `${position.x * scale}px`,
        top: `${position.y * scale}px`,
        fontSize: `${size * scale}px`,
        outline: isSelected ? '1px solid' : 'none'
      }}
      {...otherProps}
    >
      {content}
    </div>
  )
}

export default React.memo(OverlayItem)
