import axios from "axios";
import { useState } from "react";
import { IAnimal } from "../../models/IAnimal";
import './Home.css';

export function Home(){

    const [animals, setAnimals] = useState([]);


    
    axios.get('https://animals.azurewebsites.net/api/animals')
    .then(response => {
        if(!localStorage.getItem('animals')){
            localStorage.setItem('animals', JSON.stringify(response.data));
        }


        setAnimals( JSON.parse( localStorage.getItem('animals') || '' ).map( (animal:IAnimal) => {
    
            return(
                <a key={animal.id} className="animal" href={"animal/" + animal.id}>
                    <p>{animal.name}</p>
                    <img src={animal.imageUrl}></img>
                    <p>{animal.shortDescription}</p>
                </a>
            );
        }));
    });
    




    return(
        <div className="wrapper">
            {animals}
        </div>
    );
}

