import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin-services/admin.service';
import { OrderService } from 'src/app/shared/services/admin-services/order.service';
import { UserDetailService } from 'src/app/shared/services/admin-services/user-detail.service';

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.css'],
})
export class InventoryPageComponent implements OnInit {
  isLoading = false;
  inventories: any[] = [];
  currProductId!: string;
  newProduct = {
    name: '',
    quantity: 0,
    price: 0,
  };
  constructor(
    private adminservice: AdminService,
    private orderservice: OrderService,
    private userdetailservice: UserDetailService
  ) {}

  ngOnInit(): void {
    this.loadInventory();
  }
  //load the inventoy product
  loadInventory() {
    this.isLoading = true;
    this.adminservice.fetchInventory().subscribe({
      next: (data) => {
        this.inventories = data;
        this.isLoading = false;
      },
      error: (err) => {
        alert(`Error come during laoding inventory ${err}`);
        this.isLoading = false;
      },
    });
  }

  // addprodcut to inventory
  addProduct() {
    if (this.newProduct.name !== '' && !this.newProduct.quantity) {
      alert('The product quantity is not field properly ');
      return;
    }
    this.isLoading = true;
    this.adminservice.addProduct(this.newProduct).subscribe({
      next: () => {
        this.isLoading = false;
        this.loadInventory();

        this.newProduct = {
          name: '',
          quantity: 0,
          price: 0,
        };
        alert('New Product Added Successfully');
      },
      error: (err) => {
        alert(`There is an error during product addition ${err} `);
        this.isLoading = false;
      },
    });
  }

  //increase product count
  increaseProdCnt(id: string, product: any) {
    let prodquant = product.quantity;
    prodquant = prodquant + 1;
    product = {
      id: id,
      name: product.name,
      quantity: prodquant,
      price: product.price,
    };
    this.adminservice.updateProduct(product.id, product).subscribe({
      next: () => {
        alert('Product updated successfully');
        this.loadInventory();
      },
      error: (error) => {
        alert(`Error in increase cnt ${error}`);
      },
    });
  }
  //decrease product count
  decreaseProdCnt(id: string, product: any) {
    let prodquant = product.quantity;
    if (prodquant > 1) {
      prodquant = prodquant - 1;
    } else {
      this.deleteProduct(id);
    }
    product = {
      id: id,
      name: product.name,
      quantity: prodquant,
      price: product.price,
    };
    this.adminservice.updateProduct(product.id, product).subscribe({
      next: () => {
        alert('Product updated successfully');
        this.loadInventory();
      },
      error: (error) => {
        alert(`Error in decrease cnt ${error}`);
      },
    });
  }
  //delete product
  deleteProduct(id: string) {
    this.isLoading = true;
    this.adminservice.deleteProduct(id).subscribe({
      next: () => {
        this.isLoading = false;
        this.loadInventory();
      },
      error: (err) => {
        alert(`Error Occur in deleting product ${err}`);
        this.isLoading = false;
      },
    });
  }
}
