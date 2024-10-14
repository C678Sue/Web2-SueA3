import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Route, Router, RouterOutlet, Routes } from '@angular/router'
import { routes } from './app.routes'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-adminside'
}
