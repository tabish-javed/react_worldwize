import Spinner from "./Spinner"
import styles from './CountryList.module.css'
import CountryItem from "./CountryItem"
import Message from "./Message"

function CountryList ({ cities, isLoading }) {

  if (isLoading) return <Spinner />

  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />

  const countries = cities.reduce((array, city) => {
    if (!array.map(element => element.country).includes(city.country)) {
      return [...array, { country: city.country, emoji: city.emoji }]
    } else {
      return array
    }
  }, [])

  return (
    <ul className={ styles.countryList }>
      { countries.map((country) => <CountryItem country={ country } key={ country.id } />) }
    </ul>
  )
}

export default CountryList