import { Component, OnInit } from '@angular/core';
import {AppService} from './app.service'
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AppService]
})
export class AppComponent {
  public isLoggedIn: boolean = false;
  title = 'Lakhimi';
  constructor(
    private router: Router,
    private appService:AppService,
    private authService: AuthService
    ) {}
    ngOnInit(): void {
      this.isLoggedIn = this.authService.isAuthenticated();
      // let currenturl = this.router.url;
      // if(currenturl == '/login' || currenturl == '/register'){
      //   this,this.isLoggedIn=false;
      // }else{
      //   this,this.isLoggedIn=true;
      // }


      
      // console.log("test",this.isLoggedIn);
      
      // if(this.isLoggedIn){
      //   this.router.navigate(['/home']);
      // }else{
      //   this.router.navigate(['/login']);
      // }
    }


  // ngOnInit(){
  //   this.getData();
  // }
  // getData=()=>{
  //   let requestObject = {};
  //   this.appService.getData(requestObject, (callback:any)=>{
  //     console.log(callback);
      
  //   });  
  // }
}


