import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import City from "./components/City"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import Form from "./components/Form"
import AppLayout from "./pages/AppLayout"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import Pricing from "./pages/Pricing"
import Product from "./pages/Product"

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
        <Route path={ "product" } element={ <Product /> } />
        <Route path={ "pricing" } element={ <Pricing /> } />
        <Route path={ "login" } element={ <Login /> } />
        <Route path={ "app" } element={ <AppLayout /> } >
          <Route index element={ <Navigate replace to={ "cities" } /> } />
          <Route path={ "cities" } element={ <CityList cities={ cities } isLoading={ isLoading } /> } />
          <Route path={ "cities/:id" } element={ <City /> } />
          <Route path={ "countries" } element={ <CountryList cities={ cities } isLoading={ isLoading } /> } />
          <Route path={ "form" } element={ <Form /> } />
        </Route >
        <Route path={ "*" } element={ <PageNotFound /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
