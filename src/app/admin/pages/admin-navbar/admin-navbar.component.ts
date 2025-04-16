import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {
  constructor(private authservices:AuthenticationService,private router:Router){}
  logout(){this.authservices.logout();
    this.router.navigate(['/auth']);
  }
}
