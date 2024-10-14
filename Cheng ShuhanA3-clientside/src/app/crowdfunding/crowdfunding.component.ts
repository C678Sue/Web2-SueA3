import { Component, OnInit } from '@angular/core'
import { HeaderComponent } from '../shared/header/header.component'
import { FooterComponent } from '../shared/footer/footer.component'
import { CategoriesType, FundraiserService, FundraiserType } from '../services/fundraiser.service'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { FCardComponent } from '../shared/f-card/f-card.component'

@Component({
  selector: 'app-crowdfunding',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, FCardComponent],
  templateUrl: './crowdfunding.component.html',
  styleUrl: './crowdfunding.component.css',
})
export class CrowdfundingComponent implements OnInit {
  constructor(private fundraiserService: FundraiserService) {}
  formData = {
    caption: '',
    organizer: '',
    city: '',
    targetFunding: '',
    currentFunding: '',
    categoryId: '',
    selectedRadio: '',
  }
  // 分类
  categories: CategoriesType[] = []
  // 筹款活动
  fundraisers: FundraiserType[] = []
  // 提示
  tips: string = `You haven't searched yet!`
  tipsClass: string = ``

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.fundraiserService.getCategories().subscribe(res => {
      this.categories = res
    })
  }

  isFormEmpty(): boolean {
    return Object.values(this.formData).every(value => value === null || value === undefined || value === '')
  }
  search() {
    if (this.isFormEmpty()) {
      return alert('Enter at least one condition')
    }
    this.fundraiserService.searchFundraiser(this.formData).subscribe(res => {
      this.fundraisers = res
      if (res.length <= 0) {
        this.tips = `No relevant information found`
        this.tipsClass = `red`
      }
    })
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
    this.tips = `You haven't searched yet!`
    this.tipsClass = ``
  }
}
