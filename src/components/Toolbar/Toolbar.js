import React from 'react'

import styles from './Toolbar.module.css'

function toolbar({
  disabled,
  scale,
  initialCounter,
  setInitialCounter,
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
      Place next running label: {`(${counter})`}
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

  const onInitialCounterChange = event => {
    const input = event.target.value
    const value = parseInt(input)
    setInitialCounter(value)
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
      <div className={styles.group}>
        <div className={styles.text}>
          Initial counter
        </div>
        <input
          type="number"
          title="Initial Label"
          value={initialCounter}
          onChange={onInitialCounterChange}
          step="1"
          disabled={!disabled}
        />
        {runningLabelText}
      </div>
    </div>
  )
}

export default toolbar
