import axios from "axios";

export function AnimalService(){
    axios.get('https://animals.azurewebsites.net/api/animals')
        .then(response => {
            localStorage.setItem('animals', JSON.stringify(response.data));
        });
}