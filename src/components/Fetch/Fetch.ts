import axios from "axios";
import { IAnimal } from "../../models/IAnimal";

export let Fetch = new Promise((resolve, reject) => {

    axios.get<IAnimal[]>('https://animals.azurewebsites.net/api/animals')
        .then(response => {
            resolve(response.data)
        });
});