import WeatherData from "../Models/WeatherData.js";

export default interface IWeatherService {
  getAllCities(): Promise<string[]>;

  getCityData(city: string): Promise<WeatherData>;

  searchCities(city: string): Promise<WeatherData[]>;
}
