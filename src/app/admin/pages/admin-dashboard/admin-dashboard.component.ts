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

}
}
