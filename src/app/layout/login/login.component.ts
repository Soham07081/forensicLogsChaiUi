import { Component } from '@angular/core';
import { CommonService } from '../../shared/apis/common.service';
import { loginUserModel, registerUserModel } from '../../core/model/userLoginRegister.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isRegister: boolean = false;
  registerModel: registerUserModel = new registerUserModel();
  loginModel: loginUserModel = new loginUserModel();
  constructor(public commonService: CommonService, public router: Router) {

  }

  toggleForms() {
    this.isRegister = !this.isRegister;
  }

  /*************************************************************************************
    * login()
    * purpose -to login the user
  *************************************************************************************/
  login() {
    localStorage.clear();
    this.commonService.userLogin(this.loginModel).subscribe
      ((data: any) => {
        let response: any = data;
        if (response) {

          localStorage.setItem('access_token', response.access_token)
          localStorage.setItem('userID', response.user_data.id)
          this.router.navigate(['/chat']);
          console.log('Login Successful!', '');
        }
      }, (error: any) => {
        console.log('Enter Valid Credentials!', '');
      })
  }

  /*************************************************************************************
    * register()
    * purpose -to register the user
  *************************************************************************************/
  register() {
    this.commonService.userRegistration(this.registerModel).subscribe
      ((data: any) => {
        let response: any = data;
        if (response) {
          console.log('Registeration Successful!', '');
          this.isRegister = true;
        }
      }, (error: any) => {
        console.log('Enter Valid Credentials!', '');
      })
  }
}
