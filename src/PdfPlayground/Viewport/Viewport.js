import React from 'react'
import styles from './viewport.module.css'

const viewport = ({ source }) => (
  <iframe src={source} className={styles.viewport} />
)

export default viewport
