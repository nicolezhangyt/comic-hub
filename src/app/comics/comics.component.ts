import { Component, OnInit, Output } from "@angular/core";
import { Comics } from "./types";
import { ComicService } from "../comic.service";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-comics",
  templateUrl: "./comics.component.html",
  styleUrls: ["./comics.component.css"]
})
export class ComicsComponent implements OnInit {
  comics: Comics[];
  selectedComicTitle: string = "";
  constructor(
    private comicService: ComicService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.comicService.getComicsList().length) {
      this.getComics().subscribe(comics => {
        this.comicService.addComics(comics);
        this.comics = this.comicService.getComicsList();
      });
    } else {
      this.comics = this.comicService.getComicsList();
    }
  }

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

  onSelect = (comic: Comics) => {
    this.comicService.setSelectedComicId(comic.id, comic.name);
    this.router.navigate(["/comics", comic.name.replace(/[^a-z0-9]+/gi, "-")]);
    this.selectedComicTitle = this.comicService.getSelectedComicName();
  };
}
