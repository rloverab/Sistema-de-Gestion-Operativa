import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoInspEstGnvComponent } from "./go-insp-est-gnv/go-insp-est-gnv.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GoInspEstGnvComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
