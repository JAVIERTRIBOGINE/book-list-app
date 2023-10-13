import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { environment } from "src/environments/environment.prod";
import { Book } from "../models/book.model";
import { BookService } from "./book.service"

const listBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 1
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 7
    }
];

fdescribe("bookService", () => {
    let service: BookService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule],
            declarations: [],
            providers: [BookService],
            schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]

        });

    })

    beforeEach(() => {
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject( HttpTestingController );
    });

    //closes the calls
    afterEach(() => {
        httpMock.verify(); //avoid pending calls ending every test, so tests start 'clean'
    })

    it("should create", () => {
        expect(service).toBeTruthy();
    });

    it("GET books", () => {
        service.getBooks().subscribe(
            (resp: Book[]) => {
                console.log("listbook ? ", listBook)
                expect(resp).toEqual(listBook);
            }
        )

        const req = httpMock.expectOne( environment.API_REST_URL + '/book'); // AT THIS POINT  WE 'ACTIVATE' THE HTTP CAL WITH MOCK CONTROLLER
        expect(req.request.method).toBe('GET');
        req.flush(listBook); // at this point we send what we want

    });

    


})