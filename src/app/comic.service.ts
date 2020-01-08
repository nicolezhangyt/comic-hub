import { Injectable } from "@angular/core";
import { NewCharacter, Comics } from "./comics/types";
import { Observable, of } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";


@Injectable({
  providedIn: "root"
})
export class ComicService {
  comics = [];
  selectedComicName: string;
  newCharacters = {};
  selectedComicId: string;

  constructor(
    private http: HttpClient,
  ) {}

  private comicsUrl = "https://propertymecomics.s3.amazonaws.com/comics";

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getComics(): Observable<Comics[]> {
    return this.http
      .get<Comics[]>(this.comicsUrl)
      .pipe(catchError(this.handleError<Comics[]>("getComics", [])));
  }

  addComics(comic) {
    this.comics.push(...comic);
  }

  getComicsList() {
    return this.comics;
  }

  getCharacters() {
    const selectedComic = this.comics.find(
      comic => comic.id === this.selectedComicId
    );
    return selectedComic ? selectedComic.characters : null;
  }


  getSelectedComic() {
    const selectedComic = this.comics.find(
      comic => comic.id === this.selectedComicId
    );
    return selectedComic ? selectedComic : null;
  }

  delelteNewCharacter(id: number) {
    const filteredCharacter = this.newCharacters[this.selectedComicId].filter(
      character => character.id != id
    );
    this.newCharacters[this.selectedComicId] = filteredCharacter;
  }

 


  setSelectedComicId(id: string, name: string) {
    this.selectedComicId = id;
    this.selectedComicName = name;
  }

  getSelectedComicName() {
    return this.selectedComicName;
  }

  addNewCharacter(newCharacter: NewCharacter) {
    if (!this.newCharacters[this.selectedComicId]) {
      this.newCharacters[this.selectedComicId] = [];
    }
    this.newCharacters[this.selectedComicId].unshift(newCharacter);
   
  }

  getNewCharacterList() {
    return this.newCharacters[this.selectedComicId];
  }


  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
}
