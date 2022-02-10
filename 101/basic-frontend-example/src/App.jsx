import { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'

import People from './containers/People'
import logo from './logo.svg'
import './App.css'

const ALL_PERSONS = gql`
  query {
    allPersons {
      id
      name
      phone
      address {
        city
        street
      }
    }
  }
`
function App() {
  const { data, error, loading } = useQuery(ALL_PERSONS);
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        { data && data.allPersons && (
          <People people={data.allPersons}/>
        )}
      </header>
    </div>
  )
}

export default App
