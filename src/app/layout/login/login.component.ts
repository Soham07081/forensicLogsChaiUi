import { Component, inject } from '@angular/core';
import { CommonService } from '../../shared/apis/common.service';
import { loginUserModel, registerUserModel } from '../../core/model/userLoginRegister.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isRegister: boolean = false;
  registerModel: registerUserModel = new registerUserModel();
  loginModel: loginUserModel = new loginUserModel();
  isButtonLoading: boolean = false
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
    this.isButtonLoading = true
    this.commonService.userLogin(this.loginModel).subscribe
      ((data: any) => {
        let response: any = data;
        if (response) {
          this.openSnackBar('Login Successful!');
          localStorage.setItem('access_token', response.access_token)
          localStorage.setItem('userID', response.user_data.id)
          this.router.navigate(['/chat']);
        }
        this.isButtonLoading = false
      }, (error: any) => {
        console.log('Enter Valid Credentials!', '');
        this.isButtonLoading = false
      })
  }

  /*************************************************************************************
    * register()
    * purpose -to register the user
  *************************************************************************************/
  register() {
    this.isButtonLoading = true
    this.commonService.userRegistration(this.registerModel).subscribe
      ((data: any) => {
        let response: any = data;
        if (response) {
          this.openSnackBar('Registeration Successful!');
          this.isRegister = false;
          this.loginModel.userName = this.registerModel.userName
          this.loginModel.password = this.registerModel.password
        }
        this.isButtonLoading = false
      }, (error: any) => {
        console.log('Enter Valid Credentials!', '');
        this.isButtonLoading = false
      })
  }

  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }
}
