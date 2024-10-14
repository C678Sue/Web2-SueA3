import { Component, OnInit } from '@angular/core'
import { HeaderComponent } from '../shared/header/header.component'
import { FooterComponent } from '../shared/footer/footer.component'
import { CommonModule } from '@angular/common'
import { FundraiserService } from '../services/fundraiser.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  constructor(private fundraiserService: FundraiserService, private route: ActivatedRoute, private router: Router) {}
  data: any = {
    FUNDRAISER_ID: '',
    ORGANIZER: '',
    CAPTION: '',
    TARGET_FUNDING: '',
    CURRENT_FUNDING: '',
    CITY: '',
    ACTIVE: 1,
    CATEGORY_ID: '',
    CATEGORY_NAME: '',
    DESCRIPTION: '',
    donates: [],
  }

  ngOnInit(): void {
    this.fundraiserService.getDetails(this.route.snapshot.queryParams['id']).subscribe(res => {
      this.data = res
    })
  }

  toDonate(id: number) {
    this.router.navigate(['donate'], { queryParams: { id } })
  }
}
