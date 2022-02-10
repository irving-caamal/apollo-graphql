import React, { useState, useEffect } from 'react';
import Person from '../components/Person'
import { gql, useLazyQuery } from '@apollo/client';

const FIND_PERSON = gql`
    query findPersonByName($name: String!) {
        findPerson(name: $name) {
            name
            phone
            address {
                city
                street
            }
        }
    }
`;
function People({ people }) {
    const [ getPerson, result ] = useLazyQuery(FIND_PERSON);
    const [ selectedPerson, setSelectedPerson ] = useState(null);
    const showPerson = name => {
        getPerson({ variables: { name } });
    }
    const handleClick = (name) => {
        showPerson(name)
    }
    useEffect(() => {
        if (result.data) {
            setSelectedPerson(result.data.findPerson);
        }
    }, [result]);
    
    if (selectedPerson !== null) {
        return (
        <div>
            <h2>{ selectedPerson.name }</h2>
            <div>
                <p>{ selectedPerson.phone }</p>
                <p>{ selectedPerson.address.street}, { selectedPerson.address.city} </p>
                <button onClick={() => {
                
                    setSelectedPerson(null)
                    console.log({selectedPerson})
                    return
                }}>Close X</button>
            </div>
        </div>
        )
    }
    return (
        <ul>
            {people && people.map(person => (
                <li key={person.id} onClick={() => {
                    console.log({person})
                    handleClick(person.name)
                }}>
                    {person.name} {person.phone}
                </li>
            ))}
        </ul>
    )
}

export default People;