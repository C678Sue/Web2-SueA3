import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { FundraiserType } from 'src/app/services/fundraiser.service'

@Component({
  selector: 'app-f-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './f-card.component.html',
  styleUrl: './f-card.component.css',
})
export class FCardComponent {
  constructor(private router: Router) {}
  @Input() data!: FundraiserType

  getProgress(data: FundraiserType) {
    const percentage = (Number(data.CURRENT_FUNDING) / Number(data.TARGET_FUNDING)) * 100
    return Math.round(percentage * 100) / 100
  }

  toDetails(id: number) {
    this.router.navigate(['details'], { queryParams: { id } })
  }
}
