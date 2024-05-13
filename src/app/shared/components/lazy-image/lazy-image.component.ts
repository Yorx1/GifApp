import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent implements OnInit {

  public loading:boolean = false

  @Input()
  public url!:string

  @Input()
  public alt:string = ''

  ngOnInit(): void {
    if( !this.url ) throw new Error('Missing property');
  }

  load(){
    setTimeout(() => {
      this.loading = true
    }, 1000);
  }
}
