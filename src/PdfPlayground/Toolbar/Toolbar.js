import React from 'react'

import styles from './Toolbar.module.css'

function toolbar({ scale, onZoomChange, onDownload }) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.scale}>
        <button onClick={() => onZoomChange(+0.1)}>+</button>
        <button onClick={() => onZoomChange(-0.1)}>-</button>
        <input type="text" disabled value={`${(scale * 100).toFixed(0)}%`} />
      </div>

      <button onClick={onDownload}>Download</button>
    </div>
  )
}

export default toolbar
