import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Route, Router, Routes } from '@angular/router'
import { routes } from '../../app.routes'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  routes: Routes = []
  currentTitle: Route['title'] = undefined

  ngOnInit() {
    this.routes = routes.filter(f => !f.data || f.data['isMenu'] !== false)
    this.currentTitle = window.location.pathname.split('/').pop()
  }

  // 跳转
  navTo(url: string) {
    this.router.navigate([url])
  }
}
