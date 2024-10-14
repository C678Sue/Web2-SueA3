import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FundraiserService } from '../services/fundraiser.service'
import { LayoutComponent } from '../shared/layout/layout.component'

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  constructor(private fundraiserService: FundraiserService) {}
  categorys: any = []

  ngOnInit(): void {
    this.fundraiserService.getCategories().subscribe(res => {
      this.categorys = res
    })
  }
}
