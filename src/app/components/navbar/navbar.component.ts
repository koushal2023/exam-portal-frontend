import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    // by defalut isLoggedIn is set to false because user is not logged in
    // now when user will successfully logged in, loginService.isLoggedIn() mehtod will return true,
    // but the navbar isLoggedIn will not get the updated value , because ngonInIt() method will not run again , because browser window
    // will not get refereshed


    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();

    // read the theroy in login.service.ts file
    // thats why we set the value of isLoggedIn again in this subject 
    this.loginService.loginStatusSubject.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.loginService.isLoggedIn();
        this.user = this.loginService.getUser();
      }
    );
  }

  public logout() {
    this.loginService.logout();
    // this.router.navigate(['login']);
    window.location.reload();
    // this.loginService.loginStatusSubject.next(false);
  }
}
