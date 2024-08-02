import WeatherData from "../Models/WeatherData.js";
import IWeatherService from "./IWeatherService.js";
import { Filter, MongoClient } from "mongodb";

export default class MongoDBAtlasWeatherService implements IWeatherService {
  private client: MongoClient;
  constructor(private connectionOptions: any) {
    this.client = new MongoClient(connectionOptions.url);
  }

  async getAllCities(): Promise<string[]> {
    await this.client.connect();
    const database = this.client.db("weatherDB");
    const collection = database.collection("weatherData");

    const filter = { city: { $regex: "", $options: "i" } };
    const cursor = collection.find(filter, { projection: { _id: 0 } });

    //! why any ???
    const cities: any = [];

    await cursor.forEach((doc: any) => cities.push(doc.city));

    return cities;
  }

  async getCityData(city: string): Promise<WeatherData> {
    await this.client.connect();
    const database = this.client.db("weatherDB");
    const collection = database.collection("weatherData");

    const query = { city: new RegExp(`^${city}$`, "i") };
    const result = await collection.findOne(query);

    if (!result) throw new Error("City Data not found ");

    return new WeatherData(
      result.city,
      result.low,
      result.high,
      result.condition
    );
  }

  async searchCities(city: string): Promise<WeatherData[]> {
    await this.client.connect();
    const database = this.client.db("weatherDB");
    const collection = database.collection("weatherData");

    const filter = { city: { $regex: city, $options: "i" } };
    const cursor = collection.find(filter, { projection: { _id: 0 } });

    //! why any ???
    const cities: any = [];

    await cursor.forEach((doc: any) =>
      cities.push(new WeatherData(doc.city, doc.low, doc.high, doc.condition))
    );

    return cities;
  }
}
