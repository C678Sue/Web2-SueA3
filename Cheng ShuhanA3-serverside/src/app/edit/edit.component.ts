import { CommonModule, Location } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FundraiserService } from '../services/fundraiser.service'
import { ActivatedRoute, Route, Router } from '@angular/router'
import { LayoutComponent } from '../shared/layout/layout.component'
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, LayoutComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  constructor(private fundraiserService: FundraiserService, private router: Router, private route: ActivatedRoute, private location: Location) {}
  formData: any = {
    caption: null,
    categoryId: null,
    organizer: null,
    targetFunding: 1,
    city: null,
    active: 1,
    description: null,
  }
  categories: any = []

  submissionMessage: string | null = null

  ngOnInit(): void {
    this.getCategories()
    this.fundraiserService.getDetails(this.route.snapshot.queryParams['id']).subscribe(res => {
      this.formData = {
        id: res.FUNDRAISER_ID,
        organizer: res.ORGANIZER,
        caption: res.CAPTION,
        targetFunding: res.TARGET_FUNDING,
        city: res.CITY,
        active: res.ACTIVE,
        categoryId: res.CATEGORY_ID,
        description: res.DESCRIPTION,
      }
      console.log(this.formData)
    })
  }

  getCategories() {
    this.fundraiserService.getCategories().subscribe(res => {
      this.categories = res
    })
  }

  onSubmit(form: any) {
    this.fundraiserService.updateFundraiser(this.formData.id, form.value).subscribe(
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
