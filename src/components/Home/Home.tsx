import { IAnimal } from "../../models/IAnimal";
import { AnimalService } from "../services/AnimalService";
import './Home.css';

export function Home(){

    AnimalService();

    let animals = JSON.parse( localStorage.getItem('animals') || '' ).map( (animal:IAnimal) => {
        
        return(
            <a key={animal.id} className="animal" href={"animal/" + animal.id}>
                <p>{animal.name}</p>
                <img src={animal.imageUrl}></img>
                <p>{animal.shortDescription}</p>
            </a>
        );
    });


    return(
        <div className="wrapper">
            {animals}
        </div>
    );
}

