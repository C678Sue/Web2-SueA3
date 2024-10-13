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

@Injectable({
  providedIn: 'root',
})
export class FundraiserService {
  private apiUrl = 'https://24275293.it.scu.edu.au/fundraisers'
  constructor(private http: HttpClient) {}

  getFundraiser(): Observable<FundraiserType[]> {
    return this.http.get<FundraiserType[]>(this.apiUrl)
  }
}
