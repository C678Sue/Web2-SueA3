import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FundraiserService } from '../services/fundraiser.service'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { LayoutComponent } from '../shared/layout/layout.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, LayoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private fundraiserService: FundraiserService, private router: Router) {}
  formData = {
    caption: '',
    organizer: '',
    city: '',
    targetFunding: '',
    currentFunding: '',
    categoryId: '',
    selectedRadio: '',
  }
  fundraisers: any = []
  categories: any = []

  ngOnInit(): void {
    this.getCategories()
    this.search()
  }

  getCategories() {
    this.fundraiserService.getCategories().subscribe(res => {
      this.categories = res
    })
  }

  search() {
    this.fundraiserService.searchFundraiser(this.formData).subscribe(res => {
      this.fundraisers = res
    })
  }

  showConfirm(id: number) {
    const result = confirm('Are you sure you want to delete it?')
    if (result) {
      this.fundraiserService.deleteFundraiser(id).subscribe(res => {
        alert(res.message)
        this.search()
      })
    }
  }

  clearCheckboxes() {
    this.formData = {
      caption: '',
      organizer: '',
      city: '',
      targetFunding: '',
      currentFunding: '',
      categoryId: '',
      selectedRadio: '',
    }
    this.fundraisers = []
    this.search()
  }

  navTo(url: string, id: number = -1) {
    if (id === -1) {
      this.router.navigate([url])
    } else {
      this.router.navigate([url], { queryParams: { id } })
    }
  }
}
