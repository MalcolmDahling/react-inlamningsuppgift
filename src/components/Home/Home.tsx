import axios from "axios";
import { useEffect, useState } from "react";
import { IAnimal } from "../../models/IAnimal";
import { Notification } from "../Notification/Notification";
import './Home.css';

export function Home(){

    const [animals, setAnimals] = useState<IAnimal[]>([]);

    const [notification, setNotification] = useState('');


    useEffect(() => {
        axios.get<IAnimal[]>('https://animals.azurewebsites.net/api/animals')
        .then(response => {
            if(!localStorage.getItem('animals')){
                localStorage.setItem('animals', JSON.stringify(response.data));
            }

            setNotification(Notification());


            setAnimals( JSON.parse( localStorage.getItem('animals') || '' ).map( (animal:IAnimal) => {
        
                return(
                    <a key={animal.id} className="animal0" href={"animal/" + animal.id}>
                        <p>{animal.name}</p>
                        <img src={animal.imageUrl}></img>
                        <p>{animal.shortDescription}</p>
                    </a>
                );
            }));
        });
    }, []);
    
    




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

