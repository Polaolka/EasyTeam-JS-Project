import axios from 'axios';
const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
('www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552');

export default class ApiService {
  // Отримуємо дані з сервера
  async fetchRandomData() {
    const { data } = await axios.get(`${BASE_URL}random.php`);
    const response = data.drinks;
    return response;
  }
  async fetchDataByName(query) {
    const { data } = await axios.get(`${BASE_URL}search.php?s=${query}`);
    const response = data.drinks;
    console.log(response);
    return response;
  }
  async fetchDataById(id) {
    const { data } = await axios.get(`${BASE_URL}lookup.php?i=${id}`);
    const response = data.drinks;
    console.log(response);
    return response;
  }
  async fetchDataByLetter(letter) {
    const { data } = await axios.get(`${BASE_URL}search.php?f=${letter}`);
    const response = data.drinks;
    console.log(response);
    return response;
  }
  async fetchDataByIngr(query) {
    const { data } = await axios.get(`${BASE_URL}search.php?i=${query}`);
    const response = data.ingredients;
    console.log(response);
    return response;
  }
  async fetchDataByIdIngr(query) {
    const { data } = await axios.get(`${BASE_URL}lookup.php?iid=${query}`);
    const response = data.ingredients;
    console.log(response);
    return response;
  }
}
