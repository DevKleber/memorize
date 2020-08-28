import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../security/login/login.service';
import { API_PATH_IMG } from 'src/app/app.api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logo:any = '';

  constructor(private loginService:LoginService) { }
  ngOnInit() {
    this.logo = `${API_PATH_IMG}/sagesc/logo.png`
  }
  
  logout(){
    this.loginService.logout();
  }
}
