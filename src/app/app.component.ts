import { Component } from '@angular/core';
import { TailwindTestComponent } from "./Components/Testing/TailwindTest/tailwind-test.component";
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './Components/Shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, NavbarComponent, TailwindTestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Social_Media';
}
