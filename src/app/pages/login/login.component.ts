import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private loginService: LoginService, private snack: MatSnackBar, private router: Router) { }
  // you can create another class and use that instead this 
  user = {
    username: '',
    password: '',
  };
  ngOnInit(): void {
  }

  formSubmit() {
    // console.log(this.user);
    if (this.user.username.trim() == '' || this.user.username == null) {
      // alert("username is required");
      this.snack.open("username is required", 'ok', { duration: 3000 });
      return;
    }
    if (this.user.password.trim() == '' || this.user.password == null) {
      this.snack.open("password is required", 'ok');
      return;
    }

    // request to server to generate token    
    this.loginService.generateToken(this.user).subscribe(
      (data: any) => {
        console.log("success");
        console.log(data);

        // login
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            this.loginService.setUser(user);
            console.log(user);
            // redirect .... ADMIN : admin-dashboard
            // redirect .... User : user-dashboard
            if (this.loginService.getUserRole() == "ADMIN") {
              // redirect to admin dashboard
              this.router.navigate(['admin']);
              this.loginService.loginStatusSubject.next(true);
            } else if (this.loginService.getUserRole() == 'NORMAL') {
              // redirect to user dashboard
              this.router.navigate(['user/0']);
              this.loginService.loginStatusSubject.next(true);
            } else {
              this.loginService.logout();

            }
          }, (error) => {
            console.log(error);
          }
        );

      }, (error) => {
        console.log("error");
        console.log(error);
        this.snack.open("Invalid Details!! Try Again", '', { duration: 3000 });
      }
    );
  }
}
