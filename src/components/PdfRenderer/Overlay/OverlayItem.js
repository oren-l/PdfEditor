import React from 'react'

function OverlayItem({
  position,
  size,
  value,
  scale,
  template,
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
        outline: isSelected ? '1px solid red' : 'none',
        cursor: isSelected ? 'grab' : null
      }}
      draggable={isSelected}
      title={isSelected ? 'Press <Delete> to remove this' : null}
      {...otherProps}
    >
      {template(value)}
    </div>
  )
}

export default React.memo(OverlayItem)
