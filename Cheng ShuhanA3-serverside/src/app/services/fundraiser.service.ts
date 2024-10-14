import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface FundraiserType {
  FUNDRAISER_ID: number // 筹款人 ID
  ORGANIZER: string // 组织者名称
  CAPTION: string // 标题
  TARGET_FUNDING: number // 目标资金
  CURRENT_FUNDING: number // 当前资金
  CITY: string // 城市
  ACTIVE: number // 是否激活
  CATEGORY_ID: number // 类别 ID
  CATEGORY_NAME: string // 类别名称
  DESCRIPTION: string // 描述
}

export interface CategoriesType {
  CATEGORY_ID: number // 分类 ID
  NAME: string // 标题
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

  // 类别
  getCategories(): Observable<CategoriesType[]> {
    return this.http.get<CategoriesType[]>(this.apiUrl + 'categories')
  }

  // 详情
  getDetails(id: number): Observable<FundraiserType> {
    return this.http.get<FundraiserType>(this.apiUrl + 'fundraiser/' + id)
  }

  // 新增捐款人
  setDonation(data: any) {
    return this.http.post<FundraiserType>(this.apiUrl + 'donation', data)
  }

  // 新增筹款活动
  setFundraiser(form: any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl + 'fundraiser', form)
  }

  // 更新筹款人信息
  updateFundraiser(id: number, form: any): Observable<{ message: string }> {
    delete form.id
    return this.http.put<{ message: string }>(this.apiUrl + 'fundraiser/' + id, form)
  }

  // delete
  deleteFundraiser(id: number) {
    return this.http.delete<{ message: string }>(this.apiUrl + 'fundraiser/' + id)
  }
}
