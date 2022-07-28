import React, { useCallback, useState } from "react"

import styles from "./css/Filter.css"

function Filter({ onChange }) {
  const [value, setValue] = useState("")
  const onChangeWrapper = useCallback(
    event => {
      const v = event.target.value
      setValue(v)
      onChange(v)
    },
    [onChange]
  )

  return (
    <div className={styles.Filter}>
      <input type="text" value={value} placeholder="Search rows..." onChange={onChangeWrapper} />
    </div>
  )
}

export default Filter
/* https://blog.px.dev/tables-are-hard-2/ */
