import { Component, OnInit } from '@angular/core';
import { CommemorationsService } from './commemorations.service'
import { Observable, timer } from 'rxjs'


@Component({
  selector: 'app-commemorations',
  templateUrl: './commemorations.component.html',
  styleUrls: ['./commemorations.component.css']
})
export class CommemorationsComponent implements OnInit {
  showCommemorations: boolean = false;
  lastCommemorations:string = 'christmas'
  
  dateFrom = "01/12/2019";
  dateTo = "30/12/2019";

  timeAnimationInDisplay = 6000;
  

  lottieConfig = {
    path: 'assets/animations/json/christmas.json', 
    autoplay: true,
    loop: true
  };
  constructor(private commemorationsService: CommemorationsService) { }

  ngOnInit(): void {
    this.commemorations();
  }
  timeToHidden(time) {
    const numbers = timer(time);
    numbers.subscribe(x => this.showCommemorations = false);
  }

  inTime(){
    
    var dateFrom = this.dateFrom;
    var dateTo = this.dateTo;
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var dateCheck = `${dd}/${mm}/${yyyy}`;

    var d1 = dateFrom.split("/");
    var d2 = dateTo.split("/");
    var c = dateCheck.split("/");

    var from = new Date(parseInt(d1[2]), parseInt(d1[1])-1, parseInt(d1[0]));  // -1 because months are from 0 to 11
    var to   = new Date(parseInt(d2[2]), parseInt(d2[1])-1, parseInt(d2[0]));
    var check = new Date(parseInt(c[2]), parseInt(c[1])-1, parseInt(c[0]));
    
    return check > from && check < to;
  }
  commemorations() {
    let commemorations = this.getLocalStorageCommemorations();
    if(this.inTime()){
      if (commemorations == '' || (commemorations != this.lastCommemorations)) {
        this.showCommemorations = true
        this.setLocalStorageCommemorations();
        this.timeToHidden(this.timeAnimationInDisplay)
      }
    }else{
      this.showCommemorations = false
      this.setLocalStorageCommemorations();
    }
  }

  getLocalStorageCommemorations() {
    return localStorage.getItem('commemorations') || '';
  }
  setLocalStorageCommemorations() {
    localStorage.setItem('commemorations', this.lastCommemorations);
  }
}