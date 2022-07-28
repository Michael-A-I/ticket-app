import React from "react"

import styles from "./css/ColumnSelector.module.css"

function ColumnSelector({ columns }) {
  return (
    <div id="selector">
      <div className={styles.ColumnSelector}>
        <div className={styles.Label}>Show Columns:</div>
        <div className={styles.Checkboxes}>
          {columns.map(column => (
            <div key={column.id} className={styles.Checkbox}>
              <label>
                <input className={styles.Input} type="checkbox" {...column.getToggleHiddenProps()} />
                {` ${column.Header}`}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ColumnSelector
