import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";

import './Animal.css';

export function Animal(){

    let {id} = useParams();

    const [animals, setAnimals] = useState<IAnimal[]>([]);
    const [disableButton, setDisableButton] = useState(false);

    let animalNeedsFood:boolean = false;
    let threeHours = 3 * 60 * 60 * 1000;


    useEffect(() => {
        axios.get<IAnimal[]>('https://animals.azurewebsites.net/api/animals')
            .then(response => {


                if(!localStorage.getItem('animals')){
                    localStorage.setItem('animals', JSON.stringify(response.data));
                }

                

                for(let i = 0; i < response.data.length; i++){

                    if(i+1 == +id!){

        
                        console.log( new Date().getTime() - new Date(response.data[i].lastFed).getTime() > threeHours );
                    }
                }
                


                setAnimals( JSON.parse( localStorage.getItem('animals') || '' ).map( (animal:IAnimal, i:number) => {
            
                    if(i+1 == +id!){
                        return(
                            <div className="animal1" key={i}>
                                <p>{animal.name}</p>
                                <img src={animal.imageUrl}></img>
                                <p>Latinskt namn: {animal.latinName}</p>
                                <p>Född: {animal.yearOfBirth}</p>
                                <p>Beskrivning: {animal.longDescription}</p>
                                <p>Medicin: {animal.medicine}</p>
                                <p>Har ätit: { animal.isFed ? 'Ja' : 'Nej' }</p>
                                <p>Senast ätit: {animal.lastFed}</p>

                                { !animal.isFed && <input type="button" value="Mata djur" onClick={feedAnimal}></input> }
                                { animal.isFed && <input type="button" value="Mata djur" disabled></input> }
                            </div>
                        );
                    }
                    
                }));


        });
    }, [disableButton]);





    function feedAnimal(){
        let ls = JSON.parse(localStorage.getItem('animals') || '');

        for(let i = 0; i < ls.length; i++){

            if(i+1 == +id!){

                ls[i].isFed = true;
                ls[i].lastFed = new Date();

                localStorage.setItem('animals', JSON.stringify(ls));

                setDisableButton(true);
            }
        }

        
    }




    return(
        <div className="wrapper1">
            {animals}
        </div>
    );
}