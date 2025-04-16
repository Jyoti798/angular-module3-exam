import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
isLoading:boolean=false;
 errorMessage:string|null=null;

  userInput={
    email: '',
    name: '',
    password:'',
    type:'',
  }
  constructor(private router:Router,
    private authService:AuthenticationService,
    private route:ActivatedRoute,
  ){

  }
ngOnInit():void{}

onSubmit(){
this.isLoading=true;
this.errorMessage=null;
this.authService.registerUser(this.userInput).subscribe({
  next:()=>{
    this.isLoading=false;
    this.router.navigate(['../','login'],{relativeTo:this.route})
  },
  error:(error)=>{
    this.isLoading=false;
    this.errorMessage=error.error?.message||'Registration failed Try again please';
  },
});
}

onGoToLogin(){
  this.router.navigate(['../','login'],{relativeTo:this.route});
}
}
