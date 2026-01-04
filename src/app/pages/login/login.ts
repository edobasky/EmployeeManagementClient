
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginObj: any ={
    email: '',
    contactNo: ''
  }

  http = inject(HttpClient);
  router = inject(Router);
  url : string = "http://localhost:5009/api/EmployeeMaster/login"

  onLogin() {
    this.http.post(this.url,this.loginObj).subscribe({
      next : (result : any) => {
        debugger;
        console.log(result);
        localStorage.setItem('empLoginUser', JSON.stringify(result.data))
        this.router.navigateByUrl("dashboard");
      },
       error : (error : any) => {
        debugger;
        alert(error.error.message)
      }
    })
  }

}
