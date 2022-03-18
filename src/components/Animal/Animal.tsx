import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";

import './Animal.css';

export function Animal(){

    let {id} = useParams();

    const [animals, setAnimals] = useState([]);

    axios.get('https://animals.azurewebsites.net/api/animals')
        .then(response => {
            if(!localStorage.getItem('animals')){
                localStorage.setItem('animals', JSON.stringify(response.data));
            }


            setAnimals( JSON.parse( localStorage.getItem('animals') || '' ).map( (animal:IAnimal, i:number) => {
        
                if(i+1 == +id!){
                    return(
                        <div className="animal2" key={i}>
                            <p>{animal.name}</p>
                            <img src={animal.imageUrl}></img>
                            <p>Latinskt namn: {animal.latinName}</p>
                            <p>Född: {animal.yearOfBirth}</p>
                            <p>Beskrivning: {animal.longDescription}</p>
                            <p>Medicin: {animal.medicine}</p>
                            <p>Har ätit: { animal.isFed ? 'Ja' : 'Nej' }</p>
                            <p>Senast ätit: {animal.lastFed}</p>
                        </div>
                    );
                }
                
            }));
        }
    );







    return(
        <div className="wrapper2">
            {animals}
        </div>
    );
}