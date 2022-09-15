import React, { useContext, useEffect, useState } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import StateContext from "../../../../context/StateContext"
import "../css/charts.css"

function TicketStatus() {
  const [status, setStatu] = useState([])

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

    const status = await res.json()

    setStatu(status)
  }

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

  const labels = ["new", "inprogress", "completed", "additional"]

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: status,
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      }
    ]
  }

  const options = {
    color: "#ffff",
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart"
      },
      maintainAspectRatio: true
    }
  }

  return (
    <>
      <div className="charts barcharts">
        <p className="graph-title">Ticket Priorities</p>
        <Bar data={data} options={options} />
      </div>
    </>
  )
}

export default TicketStatus
