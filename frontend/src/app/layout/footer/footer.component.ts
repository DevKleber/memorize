import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  
  year:String = '';

  ngOnInit() {
    let data:any = new Date();
    this.year = data.getFullYear();
    console.log(this.year);
  }

}
