import { WeatherService } from './../weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  constructor(title: string,text: string,service: WeatherService) {
    this.title = title;
    this.text = text;
  }
  title = "";
  text = "";
  ngOnInit(): void {
  }

}
