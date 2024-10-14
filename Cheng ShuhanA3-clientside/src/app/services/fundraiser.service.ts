import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface FundraiserType {
  FUNDRAISER_ID: number // Fundraiser ID
  ORGANIZER: string // Name of the organizer
  CAPTION: string // Title
  TARGET_FUNDING: number // Target funding
  CURRENT_FUNDING: number // Current funding
  CITY: string // City
  ACTIVE: number // Whether it is active or not
  CATEGORY_ID: number // Category ID
  CATEGORY_NAME: string // Category name
  DESCRIPTION: string // Description
}

export interface CategoriesType {
  CATEGORY_ID: number // Category ID
  NAME: string // Title
}

@Injectable({
  providedIn: 'root',
})
export class FundraiserService {
  private apiUrl = 'https://24275293.it.scu.edu.au/'
  constructor(private http: HttpClient) {}

  getFundraiser(): Observable<FundraiserType[]> {
    return this.http.get<FundraiserType[]>(this.apiUrl + 'fundraisers')
  }

  searchFundraiser(params: any): Observable<FundraiserType[]> {
    return this.http.get<FundraiserType[]>(this.apiUrl + 'search', { params })
  }

  // Category
  getCategories(): Observable<CategoriesType[]> {
    return this.http.get<CategoriesType[]>(this.apiUrl + 'categories')
  }

  // Details
  getDetails(id: number): Observable<FundraiserType> {
    return this.http.get<FundraiserType>(this.apiUrl + 'fundraiser/' + id)
  }

  // New fundraisers
  setDonation(data: any) {
    return this.http.post<FundraiserType>(this.apiUrl + 'donation', data)
  }
}
