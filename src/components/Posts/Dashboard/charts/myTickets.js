import React, { useContext, useEffect, useState } from "react"
import StateContext from "../../../../context/StateContext"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import Page from "../../../ui/Page"
// import faker from "faker"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
function MyTickets() {
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top"
  //     },
  //     title: {
  //       display: true,
  //       text: "My Tickets"
  //     }
  //   }
  // }

  const appState = useContext(StateContext)
  const token = appState.user.token

  const [state, setState] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const [label, setLabel] = useState([])
  const [color, setColor] = useState([])

  const getData = async () => {
    console.log("getData")

    const email = localStorage.getItem("email")

    const res = await fetch(`/api/dashboard/myTickets/${email}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-access-token": token
      }
    })

    const { myTickets } = await res.json()

    console.log(myTickets)

    const data = [0, 0]
    const label = []

    myTickets.map(ticket => {
      if (ticket.done == true) {
        data[0] += 1
      } else {
        data[1] += 1
      }
    })

    setState(data)
    console.log({ label })
    setColor(color)
  }

  const data = {
    labels: ["completed vs not completed tickets I own"],
    datasets: [
      {
        label: ["completed"],
        data: [state[0]],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
        color: "black"
      },
      {
        label: ["not completed"],
        data: [state[1]],
        backgroundColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1
      }
    ]
  }

  const options = {
    color: "black",
    responsive: true,
    maintainAspectRatio: true
  }

  return (
    <>
      <div className="charts barcharts">
        <p className="graph-title">My Tickets</p>
        <Bar data={data} options={options} />
      </div>
    </>
  )
}

export default MyTickets
