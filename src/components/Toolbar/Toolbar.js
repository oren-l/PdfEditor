import React from 'react'

import styles from './Toolbar.module.css'

function toolbar({
  disabled,
  scale,
  counter,
  onZoomChange,
  onRotate,
  onDownload,
  onLoad,
  fontSize,
  setFontSize
}) {
  const runningLabelText = disabled ? null : (
    <div className={styles.text}>
      Place next running label: {`{${counter}}`}
    </div>
  )

  const onFontSizeChange = event => {
    const input = event.target.value
    const isValidFormat = /^\d+(\.\d)?$/.test(input)

    if (event.target.validity.valid && isValidFormat) {
      const value = parseFloat(input)
      const roundByHalf = value => Math.round(value * 2) / 2
      setFontSize(roundByHalf(value))
    }
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.group}>
        <button disabled={disabled} onClick={() => onZoomChange(+0.1)}>
          +
        </button>
        <button disabled={disabled} onClick={() => onZoomChange(-0.1)}>
          -
        </button>
        <input type="text" disabled value={`${(scale * 100).toFixed(0)}%`} />
      </div>
      <div className={styles.group}>
        <button disabled={disabled} onClick={() => onRotate(-90)}>
          Left
        </button>
        <label>Rotate</label>
        <button disabled={disabled} onClick={() => onRotate(+90)}>
          Right
        </button>
      </div>
      <div className={styles.group}>
        <input
          type="number"
          title="Font size"
          value={fontSize}
          onChange={onFontSizeChange}
          disabled={disabled}
          min="1"
          max="400"
          step="any"
        />
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
