import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
/* user context */
import DispatchContext from "../../context/DispatchContext"
import StateContext from "../../context/StateContext"

import "./css/Navbar.css"

import { Hits, InstantSearch, SearchBox } from "react-instantsearch-hooks-web"
import algoliasearch from "algoliasearch"
import Logo from "./Logo"
import DropDown from "./DropDown"
import CenterMenu from "./CenterMenu"
import ProfileDropdown from "./ProfileDropdown"
// import HitsView from "./Navbar/HitsView"
import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js"
import Autocomplete from "./AutoComplete"
import PostsHits from "./PostsHits"
import "@algolia/autocomplete-theme-classic"
import Hamburger from "./Hamburger"
import NotificationButtion from "./Notifications/NotificationButtion"
import NotificationProvider from "./Notifications/NotificationsProvider"

/* Algolia Search */
const searchClient = algoliasearch("SJKC9QEQKE", "cce92e4d566fb529a97a2eb8b9993578")
function Navbar() {
  /* user context  changed through navbar */
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const token = appState.user.token
  const [click, setClick] = useState(false)

  const history = useNavigate()
  const [search, setSearch] = useState("")
  const [dropdown, setDropdown] = useState([])

  console.log(appState)

  useEffect(() => {
    algoliaPostIndex()
    algoliaTicketIndex()
  }, [])

  const algoliaPostIndex = async () => {
    await fetch("/api/search/indexSearch", {
      headers: {
        method: "GET",
        "x-access-token": token
      }
    })
  }

  const algoliaTicketIndex = async () => {
    await fetch("/api/search/indexTickets", {
      headers: {
        method: "GET",
        "x-access-token": token
      }
    })
  }

  return (
    <InstantSearch indexName="posts" searchClient={searchClient}>
      <div id="bootstrap-overrides">
        <nav className={`navbar ${!appState.loggedIn ? "authentication" : ""}`}>
          <Logo />
          {appState.loggedIn ? <Hamburger click={click} setClick={setClick} /> : ""}
          <div className="navbar-container ">
            {/* Navbar Links */}
            {/* search for posts : links about site */}
            {/* TODO: style search and dropdowns */}

            {appState.loggedIn ? (
              <>
                <div className="nav-search">
                  {/* LOGO */}
                  {/* LOGO */}
                  {/* <Row className="search-row"> */}
                  {/* Algolia Search */}
                  {/* <Col> */}
                  {/* <SearchBox className="search-box" /> */}
                  {/* <Hits hitComponent={Hit} /> */}
                  {/* <NotificationButtion /> */}
                  <Autocomplete
                    Style={{ borderBotton: "none" }}
                    searchClient={searchClient}
                    openOnFocus={true}
                    // detachedMediaQuery="none"
                    placeholder="Search Projects"
                    getSources={({ query }) => [
                      {
                        sourceId: "posts",
                        getItems() {
                          return getAlgoliaResults({
                            searchClient,
                            queries: [
                              {
                                indexName: "projects",
                                query
                              }
                            ]
                          })
                        },
                        templates: {
                          item({ item, components }) {
                            return (
                              <>
                                <PostsHits hit={item} components={components} />
                              </>
                            )
                          },
                          noResults() {
                            return "No posts for this query."
                          }
                        }
                      }
                    ]}
                  />
                  {/* <HitsView /> */}
                  {/* Algolia Search */}
                  {/* </Col> */}
                  {/* </Row> */}
                  {/* DROP DOWN */}
                  {/* //!repurpose drop down */}
                  {/* <DropDown /> */}
                  {/* //!repurpose drop down */}

                  {/* DROP DOWN */}
                </div>
              </>
            ) : (
              <CenterMenu />
            )}
            {/* Authentication Links */}
            {appState.loggedIn ? (
              <>
                {/* ProfileDrowndown */}
                <ProfileDropdown click={click} setClick={setClick} />
                {/* ProfileDrowndown */}
              </>
            ) : (
              <>
                {/* Authentication handler */}
                {/* Authentication handler */}
              </>
            )}
          </div>
        </nav>
      </div>
    </InstantSearch>
  )
}

export default Navbar
// TODO: fix profile as it get smaller
