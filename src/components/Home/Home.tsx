import axios from "axios";
import { useEffect, useState } from "react";
import { IAnimal } from "../../models/IAnimal";
import { Notification } from "../Notification/Notification";
import './Home.css';

export function Home(){

    const [animals, setAnimals] = useState([]);
    const [notification, setNotification] = useState('');


    useEffect(() => {

        if(localStorage.getItem('animals')){

            setNotification(Notification());
            setSetAnimals();
        }

        else{

            axios.get<IAnimal[]>('https://animals.azurewebsites.net/api/animals')
                .then(response => {
                    localStorage.setItem( 'animals', JSON.stringify(response.data) );
                    setNotification(Notification());
                    setSetAnimals();
            });
        }

    },[]);



    function setSetAnimals(){

        setAnimals( JSON.parse( localStorage.getItem('animals') || '' ).map( (animal:IAnimal) => {
        
            return(
                <a key={animal.id} className="animal0" href={"animal/" + animal.id}>
                    <p>{animal.name}</p>
                    <img src={animal.imageUrl}></img>
                    <p>{animal.shortDescription}</p>
                </a>
            );
        }));
    }
    
    


    return(
        <>
            <div className="wrapper0">
                {animals}
            </div>

            <div className="notificationContainer">
                {notification}
            </div>
        </>
    );
}

