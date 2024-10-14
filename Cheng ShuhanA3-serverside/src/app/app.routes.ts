import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { EditComponent } from './edit/edit.component'
import { NewComponent } from './new/new.component'
import { CategoryComponent } from './category/category.component'

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Fundraisers' },
  { path: 'category', component: CategoryComponent, title: 'Category' },
  { path: 'edit', component: EditComponent, title: 'Edit', data: { isMenu: false } },
  { path: 'new', component: NewComponent, title: 'new', data: { isMenu: false } },
]
