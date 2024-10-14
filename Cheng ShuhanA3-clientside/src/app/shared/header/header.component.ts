import { CommonModule } from '@angular/common'
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router, Routes, Route } from '@angular/router'
import { routes } from '../../app.routes'
import { ModalComponent } from '../modal/modal.component'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private route: ActivatedRoute) {}
  @Input() welcome = true
  @Input() banner = true

  @ViewChild('welcomeRef') welcomeRef!: ElementRef
  @ViewChild(ModalComponent) modalChild!: ModalComponent
  // 路由参数
  routes: Routes = []
  currentTitle: Route['title'] = undefined
  // 轮播图
  active: number = 0
  images: string[] = ['assets/images/1.png', 'assets/images/2.png', 'assets/images/3.png', 'assets/images/4.png', 'assets/images/5.png']
  // 计时器
  private autoPlayIntervalId: ReturnType<typeof setInterval> | null = null

  // 初始化
  ngOnInit() {
    this.routes = routes.filter(f => !f.data || f.data['isMenu'] !== false)
    this.currentTitle = this.route.routeConfig?.title
    if (this.banner) {
      this.autoplay()
    }
    if (this.welcome) {
      this.setWelcome()
    }
  }
  // 销毁
  ngOnDestroy() {
    // 销毁计时器
    if (this.autoPlayIntervalId !== null) clearInterval(this.autoPlayIntervalId)
  }
  // 跳转
  navTo(url: string) {
    this.router.navigate([url])
  }
  // 轮播图
  switchBanner(index: number) {
    if (index < 0) {
      this.active = this.images.length - 1
    } else if (index >= this.images.length) {
      this.active = 0
    } else {
      this.active = index
    }
  }
  // 自动播放
  autoplay() {
    this.autoPlayIntervalId = setInterval(() => {
      this.switchBanner(this.active + 1)
    }, 2000)
  }

  //Add a scrolling fade-out effect to the welcome message
  setWelcome() {
    window.addEventListener('scroll', () => {
      //If the page scrolls more than 65 pixels, add the 'fade-out' class to the 'welcomeMessage' element
      if (window.scrollY > 65) {
        this.welcomeRef.nativeElement.classList.add('fade-out')
      } else {
        this.welcomeRef.nativeElement.classList.remove('fade-out')
      }
    })
  }

  openIntro() {
    this.modalChild.open()
  }
}
