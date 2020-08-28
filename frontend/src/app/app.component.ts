import { Component, OnInit, Renderer2 } from '@angular/core';
import { LoginService } from './security/login/login.service'


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	isLogged = false;
	globalListenFunc: Function;

	mostrarMenu: boolean = false;
	constructor(private loginService: LoginService, private renderer: Renderer2) { }

	ngOnInit() {
		this.loginService.mostrarMenu.subscribe(
			mostrarMenu => this.mostrarMenu = mostrarMenu,
			// console.log("Mostrar menu: "+this.mostrarMenu)
		);
		this.atalhosTeclado();
	}
	atalhosTeclado(){
		this.globalListenFunc = this.renderer.listen('document', 'keydown', e => {
			if (e.which == 113) { //F2
				// this.loginService.navGoTo("/pdv")
			}
		});
	}
}
