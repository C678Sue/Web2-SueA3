import { Component, OnInit, importProvidersFrom } from '@angular/core'
import { HeaderComponent } from '../shared/header/header.component'
import { FCardComponent } from '../shared/f-card/f-card.component'
import { FundraiserService, FundraiserType } from '../services/fundraiser.service'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private fundraiserService: FundraiserService) {}
  fundraisers: FundraiserType[] = []

  async ngOnInit(): Promise<void> {
    this.fundraiserService.getFundraiser().subscribe(data => {
      this.fundraisers = data
    })
  }
}
