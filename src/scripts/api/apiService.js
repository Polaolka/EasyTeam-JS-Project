import axios from 'axios';
const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

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
    return response;
  }
  async fetchDataById(id) {
    const { data } = await axios.get(`${BASE_URL}lookup.php?i=${id}`);
    const response = data.drinks;
    return response;
  }
  async fetchDataByLetter(letter) {
    const { data } = await axios.get(`${BASE_URL}search.php?f=${letter}`);
    const response = data.drinks;
    return response;
  }
  async fetchDataByIngr(id) {
    const { data } = await axios.get(`${BASE_URL}search.php?i=${id}`);
    const response = data.ingredients;
    return response;
  }
  async fetchDataByIdIngr(query) {
    const { data } = await axios.get(`${BASE_URL}lookup.php?iid=${query}`);// поправить
    const response = data.ingredients;
    return response;
  }
}
