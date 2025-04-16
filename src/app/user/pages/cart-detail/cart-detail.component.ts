import { Component, OnInit } from '@angular/core';
import { ManageService } from 'src/app/auth/services/manage.service';
import { UserService } from 'src/app/shared/services/user-services/user.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css'],
})
export class CartDetailComponent implements OnInit {
  isLoading = false;
  inventories: any[] = [];
  currProductId!: string;
  constructor(
    private manageService: ManageService,
    private userServices: UserService
  ) {}
  ngOnInit(): void {
    this.fetchInventory();
  }
  fetchInventory(){
this.isLoading=true;
this.userServices.fetchInventory().subscribe({
  next:(list)=>{
    this.inventories=list;
    this.isLoading=false;
  },
  error:(err)=>{
    alert('error happen');
    this.isLoading=false;
  }
})
  }

  addItemToCart(id:string,item:any){
this.isLoading=true;
let CartItem={
  prodId:id,
  name:item.name,
  amount:1,
  price:item.price,
}
this.userServices.addItemToCart(CartItem).subscribe({
  next:()=>{
    alert('item is added to the cart');
    this.isLoading=false;
  },
  error:(error)=>{
    alert('error happen');
    this.isLoading=false;
  },
});
  }
}
