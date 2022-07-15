import React, { useContext, useEffect, useState } from "react"
import { Button, Card, Container, FormControl, InputGroup } from "react-bootstrap"
import Navbar from "./Navbar"

import StateContext from "../context/StateContext"
import { Link } from "react-router-dom"
import Page from "./Page"
import UserIndexHits from "../components/UserIndex/UserIndexHits"
import ReactPaginate from "react-paginate"

/* CSS */
import "./css/UserIndex.css"
/* CSS */

/* React InstaSearch */
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-hooks-web"
const searchClient = algoliasearch("SJKC9QEQKE", "cce92e4d566fb529a97a2eb8b9993578")
/* React InstaSearch */

function UserIndex() {
  const appState = useContext(StateContext)
  const token = appState.user.token

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    console.log("getUsers")

    const res = await fetch(`/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    })

    const users = await res.json()

    console.log(users)
  }

  return (
    <>
      <Navbar></Navbar>
      {/* <pre>{users}</pre> */}

      <Page>
        <Container>
          <h1>People</h1>
          <InstantSearch indexName="users" searchClient={searchClient}>
            <SearchBox />
            <UserIndexHits />
          </InstantSearch>
        </Container>
      </Page>
    </>
  )
}

export default UserIndex
