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
  isLoading = false;
  userInput = {
    name: '',        
    address: '',
    phone: '',
    pincode: '',
    id: '',
    type: '',
  };

  users: any[] = []; 

  constructor(
    private adminservice: AdminService,
    private orderservice: OrderService,
    private userdetailservice: UserDetailService
  ) {}

  ngOnInit(): void {
    this.resetForm()
    this.fetchUser();
  }

  fetchUser() {
    this.isLoading = true;
    this.userdetailservice.getUserDetails().subscribe({
      next: (user: any) => {
        if (user) {
         
          this.userInput = { ...user }; 
          this.users = [user]; 
          this.isLoading = false;
        } else {
          alert('No user data found!');
          this.isLoading = false;
        }
      },
      error: (error) => {
        alert(`Error while fetching user: ${error}`);
        this.isLoading = false;
      },
    });
  }

  onSubmit() {
    if (!this.userInput.name || !this.userInput.address || !this.userInput.pincode || !this.userInput.phone) {
      alert('Please fill all the details correctly');
      return;
    }

    this.isLoading = true;
    this.userdetailservice.updateUser(this.userInput.id, this.userInput).subscribe({
      next: () => {
        alert('User updated successfully');
        this.isLoading = false;
        
        this.users = [this.userInput]; 
        this.resetForm(); 
      },
      error: (error) => {
        alert(`Error occurred: ${error}`);
        this.isLoading = false;
      },
    });
  }


  resetForm() {
    this.userInput = {
      name: '',
      address: '',
      phone: '',
      pincode: '',
      id: '',
      type: '',
    };
  }
}
