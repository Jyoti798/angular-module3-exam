import { Component, OnInit } from '@angular/core';
import { ManageService } from 'src/app/auth/services/manage.service';
import { UserService } from 'src/app/shared/services/user-services/user.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent  implements OnInit{
isLoading=false;
  orders:any[]=[]

  userId:string|undefined=undefined;
  constructor(private userService:UserService,
    private manageService:ManageService
  ){}
ngOnInit(): void {
  this.userId=this.manageService.getUserId();
  this.fetchOrder();
}

fetchOrder(){
  this.isLoading=true;
this.userService.FetchAllOrder().subscribe((list)=>{
  this.orders=list.filter((item)=>item.userId===this.userId);

this.isLoading=false;
});
}
}
