import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPriorityDirective]',
})
export class PriorityDirectiveDirective implements OnInit {
  @Input() color = '';

  constructor(private el: ElementRef) {}
  ngOnInit() {
    let aColor: string;
    aColor = this.color;
    this.el.nativeElement.style.backgroundColor = aColor;
  }
}
