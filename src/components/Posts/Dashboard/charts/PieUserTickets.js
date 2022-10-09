import React, { useContext, useEffect, useState } from "react"
import Page from "../../../ui/Page"
import { Pie } from "react-chartjs-2"
import StateContext from "../../../../context/StateContext"
import "../css/charts.css"

function PieUserTickets() {
  const appState = useContext(StateContext)
  const token = appState.user.token

  const [state, setState] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const [label, setLabel] = useState([])

  const getData = async () => {
    console.log("getData")

    const res = await fetch("/api/dashboard/userTickets", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-access-token": token
      }
    })

    const users = await res.json()

    console.log("users")
    console.log({ users })
    const userd = localStorage.getItem("username")
    users.map(user => {
      console.log({ userd })
      if (user.username == userd) {
        console.log({ tickets: user.myTickets })
        console.log("ticket")
      }
    })
  }

  const color = ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"]

  const data = {
    labels: ["Projects Completed", "Projects Not Completed"],
    datasets: [
      {
        data: state,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1
      }
    ]
  }

  const options = {
    color: "#ffff",

    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart"
      },
      responsive: false,
      maintainAspectRatio: true
    }
  }

  return (
    <>
      {console.log({ state })}

      <Pie data={data} options={options} />
    </>
  )
}

export default PieUserTickets
