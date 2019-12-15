import { Injectable } from "@angular/core";
import { Comics, NewCharacter, NewCharacters } from "./comics/types";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ComicService {
  comics = [];
  selectedComicId: string;
  selectedComicName: string;
  newCharacters: NewCharacter = {};

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
  private log(message: string) {
    this.messageService.add(`ComicService: ${message}`);
  }

  // private handleError<T>(operation = "operation", result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     this.log(`${operation} failed: ${error.message}`);
  //     return of(result as T);
  //   };
  // }

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
    this.newCharacters[this.selectedComicId].push(newCharacter);
  }

  getNewCharacterList() {
    return this.newCharacters[this.selectedComicId];
  }

  // updateComic(comic: Comics): Observable<any> {
  //   return this.http.put(this.comicsUrl, comic, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated comic id=${comic.id}`)),
  //     catchError(this.handleError<any>("updateComic"))
  //   );
  // }
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
}
