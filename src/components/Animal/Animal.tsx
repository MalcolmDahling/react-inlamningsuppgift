import { useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { AnimalService } from "../services/AnimalService";

import './Animal.css';

export function Animal(){

    AnimalService();

    let animals:IAnimal[] = JSON.parse( localStorage.getItem('animals') || '' );

    let {id} = useParams();

    let animalHtml;


    for(let i = 0; i < animals.length; i++){
        

        if(animals[i].id == +id!){

            animalHtml = (
                <div className="animal2">
                    <p>{animals[i].name}</p>
                    <img src={animals[i].imageUrl}></img>
                    <p>Latinskt namn: {animals[i].latinName}</p>
                    <p>Född: {animals[i].yearOfBirth}</p>
                    <p>Beskrivning: {animals[i].longDescription}</p>
                    <p>Medicin: {animals[i].medicine}</p>
                    <p>Har ätit: { animals[i].isFed ? 'Ja' : 'Nej' }</p>
                    <p>Senast ätit: {animals[i].lastFed}</p>
                </div>
            );
        }
    }


    return(
        <div className="wrapper2">
            {animalHtml}
        </div>
    );
}