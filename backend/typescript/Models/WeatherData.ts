export default class WeatherData {
  constructor(
    public city: string,
    public low: number,
    public high: number,
    public condition: string
  ) {}
}
