import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthMeResponse } from './core/auth/auth.models';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  private meSubject = new BehaviorSubject<AuthMeResponse | null>(null);
  me$ = this.meSubject.asObservable();

}
