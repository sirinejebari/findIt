import {Component} from '@angular/core';
import {AdService} from "../services/ad.service";
import {locationService} from "../services/locationService";
import { AgmCoreModule } from '@agm/core';
import {map} from "rxjs/operator/map";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  location= {latitude: 0, longitude: 0}
  constructor (private adService: AdService, private locationService: locationService) {}
  ngOnInit(){
    console.log("here")
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    };
  }
  setPosition(position){
    this.location = position.coords;
    console.log(position.coords);
  }


  search = {country_id :2, city_id:1, locality_id: 1};
  city = {}
  currentCity= {id:1}
  currentLocality= {id:1, lat:0, long:0}
  ads= []

  errorMessage = {}
  countries = [{id: 1, name: 'Tunisia'}, {id:2, name:'Canada'}];
  cities= []

    getAds() {
      this.search.city_id = parseInt(this.currentCity.id.toString())
      this.search.locality_id = parseInt(this.currentLocality.id.toString())
      console.log(this.search)

      this.adService.getAds(this.search)
        .subscribe(
          ads =>{this.ads = ads;
            if(this.currentLocality) {
              console.log("here")
              this.location= {latitude: this.currentLocality.lat, longitude: this.currentLocality.long}

                map = google.maps.Map(document.getElementById("map_canvas"));
                map.panTo(lati,long)
              }
            }
          ,
          error =>  this.errorMessage = <any>error);
    }
  loadCities(){
    console.log(this.search.country_id)
    this.locationService.getLocation(this.search.country_id, 'city').subscribe(
      cities => {this.cities = cities
        this.currentCity = cities[0]},
      error =>  this.errorMessage = <any>error);
  }


}

