import { Injectable } from "@angular/core";
import { NewCharacter } from "./comics/types";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ComicService {
  comics = [];
  selectedComicName: string;
  newCharacters = {};
  selectedComicId: string;

  constructor() {}

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

  // newly added
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
