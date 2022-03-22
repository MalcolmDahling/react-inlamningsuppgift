import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { Fetch } from "../Fetch/Fetch";
import { Notification } from "../Notification/Notification";

import './Animal.css';

export function Animal(){

    let {id} = useParams();

    const [animal, setAnimal] = useState([]);
    const [disableButton, setDisableButton] = useState(false);
    const [notification, setNotification] = useState('');



    useEffect(() => {

        if(localStorage.getItem('animals')){

            setNotification(Notification());
            setSetAnimal();
        }

        else{

            Fetch.then(data => {
                localStorage.setItem( 'animals', JSON.stringify(data) );
                setNotification(Notification());
                setSetAnimal();
            })
        }

        
    }, [disableButton]);





    function setSetAnimal(){
        
        setAnimal( JSON.parse( localStorage.getItem('animals') || '' ).map( (animal:IAnimal, i:number) => {
            
            if(i+1 == +id!){

                //not fed in 3 hours
                if( new Date().getTime() - new Date(animal.lastFed).getTime() > 3 * 60 * 60 * 1000 ){
                    animal.isFed = false;
                }

                return(
                    <div className="animal1" key={i}>
                        <p><strong>{animal.name}</strong></p>
                        <img src={animal.imageUrl}></img>
                        <p><strong>Latinskt namn:</strong> {animal.latinName}</p>
                        <p><strong>Född:</strong> {animal.yearOfBirth}</p>
                        <p><strong>Beskrivning:</strong> {animal.longDescription}</p>
                        <p><strong>Medicin:</strong> {animal.medicine}</p>
                        <p><strong>Har ätit:</strong> { animal.isFed ? 'Ja' : 'Nej' }</p>
                        <p><strong>Senast ätit:</strong> {animal.lastFed}</p>

                        { !animal.isFed && <input type="button" value="Mata djur" onClick={feedAnimal}></input> }
                        { animal.isFed && <input type="button" value="Mata djur" disabled></input> }
                    </div>
                );
            }
            
        }));
    }





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
        <>
            <div className="wrapper1">
                {animal}
            </div>

            <div className="notificationContainer">
                {notification}
            </div>
        </>
    );
}