import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })



export class GifsService {

  public gifsList: Gif[] = []

  private _tagsHistory: string[] = []
  private apiKey: string = 't5Ch4A4i45eqnF286I0MpIl5HL8WFjYj'
  private httpUrl: string = 'http://api.giphy.com/v1/gifs/'

  constructor(private http: HttpClient) {
    this.getLocalStorage();

    console.log('Gifs Save');
  }


  get tagsHistory(): string[] {
    return [...this._tagsHistory]
  }

  private organizedTag(tag: string) {
    tag = tag.toLowerCase()

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag)
    this._tagsHistory = this.tagsHistory.splice(0, 9)



    this.saveLocalStorage()
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private getLocalStorage():void{
    if(!localStorage.getItem('history')) { return }

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)

    if (this._tagsHistory.length === 0){ return }
    this.searchTag(this._tagsHistory[0])
  }



  public searchTag(tag: string): void {
    if (tag.length === 0) { return }


    this.organizedTag(tag)

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.httpUrl}search?${params}`)
      .subscribe(
        (resp) => {
          this.gifsList = resp.data
          console.log({ Gifs: this.gifsList });

        }
      )
  }
}
