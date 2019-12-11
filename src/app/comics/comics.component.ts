import { Component, OnInit } from "@angular/core";
import { COMICS } from "./mock-comics";
import { Comics } from "./comics";
import { ComicService } from "../comic.service";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { MessageService } from "../message.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-comics",
  templateUrl: "./comics.component.html",
  styleUrls: ["./comics.component.css"]
})
export class ComicsComponent implements OnInit {
  comics: Comics[];
  constructor(
    private comicService: ComicService,
    private http: HttpClient,
    private messageService: MessageService,
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

  // getComics(): void {
  //   this.comicService.getComics().subscribe(comics => (this.comics = comics));
  // }
  private log(message: string) {
    this.messageService.add(`ComicService: ${message}`);
  }
  private comicsUrl = "https://propertymecomics.s3.amazonaws.com/comics";

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getComics(): Observable<Comics[]> {
    return this.http.get<Comics[]>(this.comicsUrl).pipe(
      tap(_ => this.log("fetched comics")),
      catchError(this.handleError<Comics[]>("getComics", []))
    );
  }

  onSelect = (comic: Comics) => {
    this.comicService.setSelectedComicId(comic.id);
    this.router.navigate(["/detail", comic.id]);
  };
}
