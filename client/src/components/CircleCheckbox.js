import React from 'react'
import styles from '../css/circleCheckboxStyle.css';

const CircleCheckbox = () => {
  return (
    <div className={styles}>
      <label class="container">
        <input type="checkbox" />
        <span class="checkmark"></span>
      </label>
    </div>
  )
}

export default CircleCheckbox
