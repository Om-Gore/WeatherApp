import { Router, Request, Response } from "express";
import IWeatherService from "../Services/IWeatherService.js";

export default class WeatherRouter {
  public router;

  constructor(
    private service: IWeatherService,
    private routes: {
      method: "get";
      path: string;
      handler: "getAllCities" | "getCityData";
    }[]
  ) {
    this.router = Router();
    this.loadRoutes();
  }

  loadRoutes() {
    this.routes.forEach((route) =>
      this.router[route.method](route.path, this[route.handler].bind(this))
    );
  }

  async getAllCities(req: Request, res: Response) {
    try {
      const cities = await this.service.getAllCities();
      res.json(cities);
    } catch (error) {
      res.status(404).json((error as Error).message);
    }
  }

  async getCityData(req: Request, res: Response) {
    try {
      let city: string = req.params.city;
      if (city === undefined || city.trim() === "")
        res.status(401).json("city should not be empty or missing");

      city = city.toLocaleLowerCase();
      const cityData = await this.service.getCityData(city);

      res.json(cityData);
    } catch (error) {
      res.status(404).json((error as Error).message);
    }
  }

  async searchCities(req: Request, res: Response) {
    try {
      const queryString = req.query;
      let { city, ...rest } = queryString;

      if (city === undefined || typeof city !== "string") {
        city = "";
      }

      const cities = await this.service.searchCities(city as string);

      res.json(cities);
    } catch (error) {
      res.status(404).json((error as Error).message);
    }
  }
}
