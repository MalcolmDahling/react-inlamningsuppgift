import { IAnimal } from "../../models/IAnimal";
import './Notification.css';

export function Notification(){

    let notification = JSON.parse( localStorage.getItem('animals') || '' ).map( (animal:IAnimal, i:number) => {
            
        if( new Date().getTime() - new Date(animal.lastFed).getTime() > 4 * 60 * 60 * 1000 ){
            
            return(
            <div className="notification" key={animal.id}>
                {animal.name} har inte matats på mer än 4 timmar.
            </div>
            );
        }
    });


    return(notification);
}