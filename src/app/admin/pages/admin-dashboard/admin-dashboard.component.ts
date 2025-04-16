import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin-services/admin.service';
import { OrderService } from 'src/app/shared/services/admin-services/order.service';
import { UserDetailService } from 'src/app/shared/services/admin-services/user-detail.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  isLoading=false;
  userInput={
    name:'',
    email:'',
    address:'',
    phone:'',
    pincode:'',
    id:'',
    type:'',
  };

  constructor(private adminservice:AdminService,
    private orderservice:OrderService,
    private userdetailservice:UserDetailService
  ){}

ngOnInit(): void {
  this.fetchUser();

}
fetchUser(){
this.isLoading=true;
this.userdetailservice.getUserDetails().subscribe({
  next:(user:any)=>{
    this.userInput=user;
    this.isLoading=false;
  },
  error:(error)=>{
alert(`error while fetching the user${error}`);
this.isLoading=false;
  },
});
}
onSubmit(){
  if(!this.userInput){
    alert('The user details are not correct fill it properly');
    return;
  }
  this.isLoading=true;
  this.userdetailservice.updateUser(this.userInput.id,this.userInput).subscribe({
    next:()=>{
      alert('User are updated succefully');
      this.isLoading=false;
      this.fetchUser();
    },
    error:(error)=>{
      alert(`Error occur ${error}`);
      this.isLoading=false;
    }
  })
}
}
