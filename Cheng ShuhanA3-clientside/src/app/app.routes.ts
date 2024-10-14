import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { CrowdfundingComponent } from './crowdfunding/crowdfunding.component'
import { DetailsComponent } from './details/details.component'
import { DonateComponent } from './donate/donate.component'

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'home' },
  { path: 'search', component: CrowdfundingComponent, title: 'Crowdfunding' },
  { path: 'details', component: DetailsComponent, title: 'Details', data: { isMenu: false } },
  { path: 'donate', component: DonateComponent, title: 'Donate', data: { isMenu: false } },
]
