import React, { useContext, useEffect, useState } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import StateContext from "../../../../context/StateContext"
import "../css/charts.css"

function TicketStatus() {
  const [status, setStatus] = useState([])

  const appState = useContext(StateContext)
  const token = appState.user.token

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const email = localStorage.getItem("email")

    const res = await fetch(`/api/dashboard/ticketstatus/${email}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-access-token": token
      }
    })

    const users = await res.json()
    console.log({ users })

    const status = [0, 0, 0, 0]

    users.myTickets.forEach(user => {
      if (user.status == "new") {
        console.log((status[0] += 1))
      }
      if (user.status == "inprogress") {
        console.log((status[1] += 1))
      }
      if (user.status == "completed") {
        console.log((status[2] += 1))
      }
      if (user.status == "additional") {
        console.log((status[3] += 1))
      }
    })

    setStatus(status)
  }

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

  const labels = ["new", "inprogress", "completed", "additional"]

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: status,
        backgroundColor: "rgba(255, 99, 132, 0.5)"
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
      <p className="graph-title">Ticket Status</p>
      <Bar data={data} options={options} />
    </>
  )
}

export default TicketStatus
