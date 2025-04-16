import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoading:boolean=false;
 errorMessage:string|null=null;

  userInput={
    email: '',
    password:'',
  }
 constructor(private router:Router,
    private authService:AuthenticationService,
    private route:ActivatedRoute,
  ){

  }
  onSubmit(){
    this.isLoading=true;
    this.errorMessage=null;
    this.authService.loginUser(this.userInput).subscribe({
      next:(user:User)=>{
        this.isLoading=false;
const type=user.type.toLowerCase().trim();
if(!user.name){
this.router.navigate([`../../,${type}`,`dashboard`]);
}
else{
this.router.navigate(['../../',type],{relativeTo:this.route});
}
      
      },
      error:(error)=>{
this.isLoading=false;
this.errorMessage=error.error?.message||'Login failed Try again please';
      }
    });
  }

  onGoToSignup(){
    this.router.navigate(['../register'],{relativeTo:this.route});
  }
}
