import { TestBed, inject, async } from '@angular/core/testing';

import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ComicService } from './comic.service';
  
describe('TestService', () => {

  let httpMock: HttpTestingController;
  let testService: ComicService;

  beforeEach(() => {

    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ ComicService ]
    });

    testService = TestBed.get(ComicService);
    httpMock = TestBed.get(HttpTestingController);

  });

  it('should http GET comics', () => {

    const mockComics = [
              {
                id: "1",
                name: "name1",
                description: "description1",
                image: "http://comics1.jpg",
                characters:[],
              },
              {
                id: "2",
                name: "name2",
                description: "description2",
                image: "http://comics2.jpg",
                characters:[],
              }
            ];

    testService.getComics().subscribe((res) => {
      expect(res).toEqual(mockComics);
    });

    const req = httpMock.expectOne(testService.comicsUrl);
    expect(req.request.method).toEqual("GET");
    req.flush(mockComics);

    httpMock.verify();
  });

    it("should set the comic Id and name", () => {
    const service: ComicService = TestBed.get(ComicService);
    service.setSelectedComicId("1", "comic1");
    expect(service.getSelectedComicName()).toBe("comic1");
    service.setSelectedComicId("2", "comicname2");
    expect(service.getSelectedComicName()).toBe("comicname2");
  });

  it("should add new character", () => {
    const service: ComicService = TestBed.get(ComicService);
    const newCharacter = {
      id: 1,
      name: "name1",
      description: "description1",
      imageUrl: "url1"
    };
    service.addNewCharacter(newCharacter);
    expect(service.getNewCharacterList().length).toBeGreaterThanOrEqual(1);
  });


  it("delete a character", () => {
    const service: ComicService = TestBed.get(ComicService);
    const newCharacterTwo = {
      id: 2,
      name: "name2",
      description: "description2",
      imageUrl: "url2"
    };
    service.selectedComicId = '1';
    service.addNewCharacter(newCharacterTwo);
    service.delelteNewCharacter(2);
    expect(service.getNewCharacterList.length).toBeLessThan(1);
  });


});