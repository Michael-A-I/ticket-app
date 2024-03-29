import React, { useContext, useEffect, useState } from "react"
import Page from "../../../ui/Page"
import { Pie } from "react-chartjs-2"
import StateContext from "../../../../context/StateContext"
import "../css/charts.css"

function ProjectCompleted() {
  const appState = useContext(StateContext)
  const token = appState.user.token

  const [state, setState] = useState([0, 0])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    console.log("getData")

    const res = await fetch("/api/dashboard/index", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-access-token": token
      }
    })

    const projects = await res.json()

    const data = [0, 0]

    projects.map((project, index) => {
      if (project.done == true) {
        // console.log("true")
        data[0] += 1
      } else {
        // console.log("false")
        data[1] += 1
      }
    })

    setState(data)
  }
  const randomNumber = Math.random() * 255 + 1

  const data = {
    labels: ["Projects Completed", "Projects Not Completed"],
    datasets: [
      {
        label: "# of Votes",
        data: state,
        // hoverBorderColor: `rgba(${randomNumber},${randomNumber},${randomNumber},${randomNumber})`,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1
      }
    ]
  }

  const options = {
    plugins: {
      // responsive: true,
      legend: {
        position: "top",
        labels: {
          color: "black",
          font: 18
        }
      },
      title: {
        display: true,
        text: "Projects Completed",
        color: "black"
      },

      responsive: false,
      maintainAspectRatio: true
    }
    // layout: {
    //   padding: {
    //     top: 100,
    //     bottom: 100,
    //     left: 100,
    //     right: 100
    //   },

    // }
  }

  return (
    <>
      {/* {console.log(state)} */}
      {/* {console.log(state.completed)} */}

      <Pie data={data} options={options} />
    </>
  )
}

export default ProjectCompleted
