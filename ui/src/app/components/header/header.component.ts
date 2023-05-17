import {DoCheck, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck{
  ngOnInIt(){
    sessionStorage.setItem('role', 'waiting')
  }
  
  role = sessionStorage.getItem('role');
  user: boolean = false;
  admin: boolean = false;
  waiting: boolean = false;

  ngDoCheck(){
    
    this.role = sessionStorage.getItem('role');

    if(this.role == 'user'){
      this.user = true;
      this.admin = false;
      this.waiting = false;
    }else if(this.role == 'admin'){
      this.user = false;
      this.admin = true;
      this.waiting = false;
    }else if(this.role == 'waiting'){
      this.user = false;
      this.admin = false;
      this.waiting = true;
    }
  }
}