import axios from "axios";

export async function AnimalService(){

    if(!localStorage.getItem('animals')){
        
        axios.get('https://animals.azurewebsites.net/api/animals')
        .then(response => {
            localStorage.setItem('animals', JSON.stringify(response.data));
        });
    }
}