import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack: MatSnackBar) { }
  // you can create another class and use that instead this 
  user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  ngOnInit(): void {
  }

  formSubmit() {
    // console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert("username is required");
      this.snack.open("username is required", 'ok', { duration: 3000 });
      return;
    }
    if (this.user.password == '' || this.user.password == null) {
      this.snack.open("password is required", 'ok');
      return;
    }
    if (this.user.firstName == '' || this.user.firstName == null) {
      this.snack.open("firstName is required", 'ok');
      return;
    }
    if (this.user.lastName == '' || this.user.lastName == null) {
      this.snack.open("lastName is required", 'ok');
      return;
    }
    if (this.user.email == '' || this.user.email == null) {
      this.snack.open("email is required", 'ok');
      return;
    }
    if (this.user.phone == '' || this.user.phone == null) {
      this.snack.open("phone is required", 'ok');
      return;
    }

    // validate

    this.userService.addUser(this.user).subscribe(
      (response: any) => {
        console.log(response);
        // alert('success');
        // this.snack.open("registration completed successfully", "", { duration: 3000 });
        console.log("this is response");

        Swal.fire('Successfully Registered !!', response.username + ' is registered successfully', 'success');
      }, (error) => {
        console.log(error);
        // alert('something went wrong');
        // this.snack.open("something went wrong", "", { duration: 3000 });
        console.log("this is error");

        Swal.fire('Error ', 'user with this username is already there in DB !! try with another username', 'error');

      }
    );
  }
}
