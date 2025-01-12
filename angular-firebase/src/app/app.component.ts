import { Component, inject, OnInit, VERSION } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './auth.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
authService = inject(AuthService)

ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if(user){
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      }else{
        this.authService.currentUserSig.set(null);
      }

        console.log(this.authService.currentUserSig())
    });
}

logout(): void {
  this.authService.logout();
}
  title = 'angular-firebase';
  name = 'Angular version' + VERSION.major;
}
