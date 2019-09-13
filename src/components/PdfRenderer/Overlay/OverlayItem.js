import React from 'react'

import styles from './Overlay.module.css'

function OverlayItem({
  position,
  size,
  value,
  scale,
  template,
  isSelected,
  ...otherProps
}) {
  return (
    <div
      className={`${styles.item} ${isSelected ? styles.selected : ''}`}
      style={{
        left: `${(position.x - size / 2) * scale}px`,
        top: `${(position.y - size / 2) * scale}px`,
        fontSize: `${size * scale}px`
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
