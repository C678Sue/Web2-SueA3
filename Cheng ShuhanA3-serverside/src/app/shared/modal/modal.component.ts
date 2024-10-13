import { Component, ElementRef, ViewChild } from '@angular/core'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @ViewChild('modal') modalRef!: ElementRef

  open() {
    this.modalRef.nativeElement.style.display = 'block'
    document.body.style.height = '100vh'
    document.body.style.overflow = 'hidden'
  }
  close() {
    this.modalRef.nativeElement.style.display = 'none'
    document.body.style.height = 'auto'
    document.body.style.overflow = ''
  }
}
