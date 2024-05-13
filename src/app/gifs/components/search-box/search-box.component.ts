import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <input type="text"
  class="form-control"
  placeholder="Buscar"
  (keyup.enter)="searchUp()"
  #txtTagInput
  >
  `
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

  constructor(private gifsService: GifsService) {

  }

  searchUp() {
    const newTag = this.tagInput.nativeElement.value

    this.gifsService.searchTag(newTag)

    this.tagInput.nativeElement.value = ''

  }


}
