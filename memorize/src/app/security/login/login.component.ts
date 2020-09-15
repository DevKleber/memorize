import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from './user.model';
import { NotificationService } from '../../shared/messages/notification.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	newAccountForm: FormGroup;
	navigateTo: string;
	isNewAccount: boolean = false;

	constructor(
		private fb: FormBuilder,
		private loginService: LoginService,
		private notificationService: NotificationService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.loginForm = this.fb.group({
			email: this.fb.control('email@gmail.com', [Validators.required]),
			password: this.fb.control('3ptp3tc', [Validators.required]),
		});
		this.newAccountForm = this.fb.group({
			nome: this.fb.control('', [Validators.required]),
			email: this.fb.control('', [Validators.required]),
			password: this.fb.control('', [Validators.required]),
		});
		//btoa é para criptografar com javascript puro
		this.navigateTo =
			this.activatedRoute.snapshot.params['to'] || btoa('/');
		// console.log(atob(this.navigateTo));
	}
	changeToNewAccount() {
		this.isNewAccount = true;
	}
	changeToLogin() {
		this.isNewAccount = false;
	}
	newAccount() {
		this.loginService
			.newAccount(this.newAccountForm.value)
			.subscribe((res) => {
				this.loginForm.controls['email'].setValue(res['dados'].email);
				this.loginForm.controls['password'].setValue(
					this.newAccountForm.value.password
				);
				this.login();
			});
	}
	login() {
		this.loginService
			.login(this.loginForm.value.email, this.loginForm.value.password)
			.subscribe(
				(user) => {
					console.log(user.me['nome']);
					location.replace('/');
					this.notificationService.notifySweet(
						`Bem vindo, ${user.me['nome']}`
					);
					// this.notificationService.notifySweet(),

					//atob é para decodificar
					// this.router.navigate(['/']);
					// location.reload();
					// console.log("/#"+atob(this.navigateTo))
					// this.router.navigate([atob(this.navigateTo)])
				},

				(response) => {
					if (response.status === 401) {
						this.notificationService.notifyAlert(
							'Usuário ou senha inválida'
						);
					}
					if (response.status === 0) {
						this.notificationService.notifyError(
							'SERVIDOR OFFILINE'
						);
					}
				} //httpErrorResponse
				// () => {}
			);
	}
}
