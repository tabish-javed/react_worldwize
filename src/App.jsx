import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"

import Homepage from "./pages/Homepage"
import AppLayout from "./pages/AppLayout"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import PageNotFound from "./pages/PageNotFound"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"

const BASE_URL = "http://localhost:8000/cities"

function App () {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(function () {
    async function fetchCities () {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}`)
        const data = await res.json()
        setCities(data)
      } catch (error) {
        if (error) alert("There was an error loading data!")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <Homepage /> } />
        <Route path={ "/product" } element={ <Product /> } />
        <Route path={ "/pricing" } element={ <Pricing /> } />
        <Route path={ "/login" } element={ <Login /> } />
        <Route path={ "/app" } element={ <AppLayout /> } >
          <Route index element={ <CityList cities={ cities } isLoading={ isLoading } /> } />
          <Route path={ "cities" } element={ <CityList cities={ cities } isLoading={ isLoading } /> } />
          <Route path={ "countries" } element={ <CountryList cities={ cities } isLoading={ isLoading } /> } />
          <Route path={ "form" } element={ <p>Form</p> } />
        </Route >
        <Route path={ "*" } element={ <PageNotFound /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
