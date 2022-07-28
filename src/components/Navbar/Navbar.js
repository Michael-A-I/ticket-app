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
    // logout()
    // algoliaPostIndex()
  }, [])

  const algoliaPostIndex = async () => {
    // const searchedPosts = await fetch("/api/posts/search", {
    //   headers: {
    //     method: "GET",
    //     "x-access-token": token
    //   }
    // })
  }

  return (
    <InstantSearch indexName="posts" searchClient={searchClient}>
      <div id="bootstrap-overrides">
        <nav className={`navbar ${!appState.loggedIn ? "authentication" : ""}`}>
          <Logo />
          <Hamburger click={click} setClick={setClick} />
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
                  <Autocomplete
                    Style={{ borderBotton: "none" }}
                    searchClient={searchClient}
                    openOnFocus={true}
                    // detachedMediaQuery="none"
                    placeholder="Search posts"
                    getSources={({ query }) => [
                      {
                        sourceId: "posts",
                        getItems() {
                          return getAlgoliaResults({
                            searchClient,
                            queries: [
                              {
                                indexName: "posts",
                                query
                              }
                            ]
                          })
                        },
                        templates: {
                          item({ item, components }) {
                            return <PostsHits hit={item} components={components} />
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
