import React, { useContext, useEffect, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import StateContext from "../../../../context/StateContext"
import "../css/charts.css"

ChartJS.register(ArcElement, Tooltip, Legend)

function BugsFeatures() {
  const [priority, setPriority] = useState()
  const appState = useContext(StateContext)
  const token = appState.user.token

  useEffect(() => {
    getData()
  }, [])

  const data = {
    labels: ["low", "medium", "high", "none"],
    datasets: [
      {
        label: "# of Votes",
        data: priority,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 3
      }
    ]
  }

  const getData = async () => {
    const email = localStorage.getItem("email")

    const res = await fetch(`/api/dashboard/bugsandfeatures/${email}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-access-token": token
      }
    })

    const users = await res.json()

    const priority = [0, 0, 0, 0]

    users.myTickets.forEach(user => {
      if (user.priority == "low") {
        console.log((priority[0] += 1))
      }
      if (user.priority == "medium") {
        console.log((priority[1] += 1))
      }
      if (user.priority == "high") {
        console.log((priority[2] += 1))
      }
      if (user.priority == "none") {
        console.log((priority[3] += 1))
      }
    })
    setPriority(priority)
  }

  const options = {
    color: "black",
    responsive: true,
    maintainAspectRatio: true
  }

  return (
    <>
      <div className="charts piecharts" style={{ borderRadius: "15px" }}>
        <p className="graph-title">Ticket Status</p>
        <Doughnut data={data} options={options} />
      </div>
    </>
  )
}

export default BugsFeatures
