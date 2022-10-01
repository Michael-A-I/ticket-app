import React, { useEffect, useState } from "react"

function ImageView(props) {
  const [files, setFiles] = useState(props.files)
  const [clicked, setClicked] = useState(false)
  const [indx, setIndx] = useState()
  const imageViewer = index => {
    console.log("change size")
    setClicked(!clicked)
    setIndx(index)
  }

  return (
    <>
      <h1 style={{ fontSize: "16px", padding: "10px 0px" }}>Image View</h1>
      <div style={{ display: "flex" }}>
        {files.map((file, index) => {
          console.log({ file, index })
          return (
            <div style={{ padding: "10px" }}>
              {clicked && indx == index ? (
                <>
                  <div style={{ position: "absolute", top: "-100px", left: "-2000%", height: "12000vh", width: "12000vw", background: "black", opacity: "0.7" }}></div>
                  <img src={`${file}`} alt={`file${index}`} style={{ border: "1px solid black", position: "absolute", top: "20%", left: "20%", width: "800px" }} onClick={() => imageViewer(index)} />{" "}
                </>
              ) : (
                <img src={`${file}`} alt={`file${index}`} style={{ width: "200px" }} onClick={() => imageViewer(index)} />
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ImageView
