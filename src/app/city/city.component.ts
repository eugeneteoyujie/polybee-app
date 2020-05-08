import { WeatherService } from './../weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  title: string;
  text: string;
  service: WeatherService;
  weatherResult : WeatherResult

  constructor(service: WeatherService) {
    this.service = service;
  }
  showWeather(){
    console.log("Hello");
    this.title = "Hello";
    this.service.getWeather("Singapore");
  }
  
  ngOnInit(): void {
  }
}

export interface WeatherResult{
  base : string;
  temp_min : number;

}