import { CommonModule, Location } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FundraiserService } from '../services/fundraiser.service'
import { Route, Router } from '@angular/router'
import { LayoutComponent } from '../shared/layout/layout.component'

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, FormsModule, LayoutComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
})
export class NewComponent {
  constructor(private fundraiserService: FundraiserService, private router: Router, private location: Location) {}
  formData: any = {
    caption: null,
    categoryId: null,
    organizer: null,
    targetFunding: 1,
    city: null,
    active: null,
    description: null,
  }
  categories: any = []

  submissionMessage: string | null = null

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.fundraiserService.getCategories().subscribe(res => {
      this.categories = res
    })
  }

  onSubmit(form: any) {
    this.fundraiserService.setFundraiser(form.value).subscribe(
      res => {
        alert(res.message || 'successfully added')
        this.location.back()
      },
      err => {
        alert(err.error.message || 'addition failed')
      }
    )
  }
}
