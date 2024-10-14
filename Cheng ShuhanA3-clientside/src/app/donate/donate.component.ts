import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FundraiserService } from '../services/fundraiser.service'
import { CommonModule, Location } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HeaderComponent } from '../shared/header/header.component'
import { FooterComponent } from '../shared/footer/footer.component'

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css',
})
export class DonateComponent implements OnInit {
  constructor(private fundraiserService: FundraiserService, private router: Router, private route: ActivatedRoute, private location: Location) {}
  local: any = {}
  formData = {
    GIVER: '',
    AMOUNT: 0,
    FUNDRAISER_ID: 0,
  }

  ngOnInit(): void {
    this.formData.FUNDRAISER_ID = this.route.snapshot.queryParams['id']
    this.fundraiserService.getDetails(this.route.snapshot.queryParams['id']).subscribe(res => {
      this.local = res
      this.formData['FUNDRAISER_ID'] = res.FUNDRAISER_ID
    })
  }
  toDetails(id: number) {
    this.router.navigate(['details'], { queryParams: { id } })
  }
  submitMyDonate() {
    if (Number(this.formData.AMOUNT) < 5) return alert('The minimum donation amount is AUD 5')
    this.fundraiserService.setDonation(this.formData).subscribe(res => {
      alert('Thank you for your donation to ' + this.local.ORGANIZER)
      this.location.back()
    })
  }
}
