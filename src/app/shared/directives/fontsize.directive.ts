import { Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appFontsize]'
})
export class FontsizeDirective implements OnInit{

  constructor(private element: ElementRef) { }

  ngOnInit(){
    this.element.nativeElement.style.fontSize = '20px';
  }
}
