import express from "express";
import cors from "cors";
import WeatherRouter from "../Routers/WeatherRouter.js";
import config from "../config.json";

export default class WeatherApp {
  private app;

  constructor() {
    this.app = express();
    this.loadMiddlewares();
    this.loadRouters();
    this.startServer();
  }

  loadMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  loadRouters() {
    config.routers.forEach(async (router) => {
      //path for main route
      const path = router.path;

      //getting service name from route and then getting class, connectionOptions for that service
      const serviceName = router.serviceName;
      const serviceJson = config.services.find(
        (service) => service.name == serviceName
      );
      const serviceClass = serviceJson?.class;
      const connectionOptions = serviceJson?.connectionOptions;

      //getting router class
      const routerClass = router.class;

      //getting routes
      const routes = router.routes;

      const Service = (await import(`../Services/${serviceClass}.js`)).default;
      const Router = (await import(`../Routers/${routerClass}.js`)).default;
      this.app.use(
        path,
        new Router(new Service(connectionOptions), routes).router
      );
    });
  }

  startServer() {
    this.app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  }
}
