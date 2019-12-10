import { Injectable } from "@angular/core";
import { Comics } from "./comics/comics";
import { COMICS } from "./comics/mock-comics";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ComicService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
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
    this.messageService.add("ComicService:fetched comics");
    return this.http.get<Comics[]>(this.comicsUrl).pipe(
      tap(_ => this.log("fetched comics")),
      catchError(this.handleError<Comics[]>("getComics", []))
    );
    // return this.http.get<Comics[]>(this.comicsUrl).map((response:Response)=>{
    //   return <Comics[]>response.json();
    // })
    // .catch(this.handleError<Comics[]>("getComics",[]));
  }

  getComic(id: number): Observable<Comics> {
    const url = `${this.comicsUrl}/${id}`;
    return this.http.get<Comics>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Comics>(`getComic id=${id}`))
    );
    // this.messageService.add(`MessageService: fetched comics id = ${id}`);
    // return of(COMICS.find(comic => comic.id === id));
  }

  updateComic(comic: Comics): Observable<any> {
    return this.http.put(this.comicsUrl, comic, this.httpOptions).pipe(
      tap(_ => this.log(`updated comic id=${comic.id}`)),
      catchError(this.handleError<any>("updateComic"))
    );
  }
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
}
