import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ComicDetailComponent } from "./comic-detail.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDialogModule } from "@angular/material/dialog";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ComicsComponent } from "../comics/comics.component";
import { HttpClientModule } from "@angular/common/http";


describe("ComicDetailComponent", () => {
  let component: ComicDetailComponent;
  let fixture: ComponentFixture<ComicDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComicDetailComponent, ComicsComponent],
      imports: [
        MatToolbarModule,
        HttpClientModule,
        MatDialogModule,
        RouterModule.forRoot([])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
