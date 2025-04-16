import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin-services/admin.service';
import { OrderService } from 'src/app/shared/services/admin-services/order.service';
import { UserDetailService } from 'src/app/shared/services/admin-services/user-detail.service';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {

  orders:any[]=[];
  filteredOrders:any[]=[];
  filterStatus:string='';
  isLoading=false;
   constructor(private adminservice:AdminService,
     private orderservice:OrderService,
     private userdetailservice:UserDetailService
   ){}

   ngOnInit(): void {
     this.loadOrders();
   }
loadOrders(){
    this.isLoading=true;
    this.orderservice.fetchOrder().subscribe({
next:(orderData)=>{
  this.orders=orderData||[];
  this.filteredOrders=[...this.orders];

  this.isLoading=false;
},
error:(err)=>{
  alert(`Error Occured in fetching order`);
  this.isLoading=false;
},
    });
  }

  filterOrder(){
    if(this.filterStatus){
      this.filteredOrders=this.orders.filter(
        (order)=>order.status===this.filterStatus
      );

    }
    else{
      this.filteredOrders=[...this.orders];
    }
  }

  changeOrderStatus(id:string,order:any){
    this.orderservice.updateOrder(id,order).subscribe({
      next:()=>{
        alert(`order #${id} status updated`);
      },
      error:(err)=>{
        alert('error in updating status');
      },
    });
  }
  
  removeOrder(id:string){
    if(confirm(`Are You sure to delete the order #${id}?`)){
      this.orderservice.deleteOrder(id).subscribe({
        next:()=>{
          this.orders=this.orders.filter((order)=>order.id!==id);
          this.filterOrder();
        },
        error:(err:any)=>{
          alert('error in deleting the order');
        },
      })
    }

  }
  }

