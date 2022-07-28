import React from "react"
import styles from "./css/ColumnSelector.module.css"

function Resizer({ col }) {
  return (
    <div {...col.getResizerProps()} className={[styles.ResizeHandle, col.isResizing && styles.ResizeHandleActive].filter(x => x).join(" ")}>
      + &#x22EE; +{" "}
    </div>
  )
}

export default Resizer
