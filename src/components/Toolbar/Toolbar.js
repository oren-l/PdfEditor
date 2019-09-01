import React from 'react'

import styles from './Toolbar.module.css'

function toolbar({
  disabled,
  scale,
  counter,
  onZoomChange,
  onDownload,
  onLoad
}) {
  const runningLabelText = disabled ? null : (
    <div className={styles.text}>
      Place next running label: {`{${counter}}`}
    </div>
  )
  return (
    <div className={styles.toolbar}>
      <div className={styles.scale}>
        <button disabled={disabled} onClick={() => onZoomChange(+0.1)}>
          +
        </button>
        <button disabled={disabled} onClick={() => onZoomChange(-0.1)}>
          -
        </button>
        <input type="text" disabled value={`${(scale * 100).toFixed(0)}%`} />
      </div>

      <button disabled={disabled} onClick={onLoad}>
        Load
      </button>
      <button disabled={disabled} onClick={onDownload}>
        Download
      </button>
      {runningLabelText}
    </div>
  )
}

export default toolbar