import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ComicsComponent } from "./comics.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "../app-routing.module";
import { ComicDetailComponent } from "../comic-detail/comic-detail.component";


describe("ComicsComponent", () => {
  let component: ComicsComponent;
  let fixture: ComponentFixture<ComicsComponent>;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComicDetailComponent,ComicsComponent],
      imports: [MatToolbarModule, HttpClientModule, AppRoutingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  }); 

});
