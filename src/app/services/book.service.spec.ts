import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { environment } from "src/environments/environment.prod";
import Swal from "sweetalert2";
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

const bookLocal: Book = 
    {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 7
    }


fdescribe("bookService", () => {
    let service: BookService;
    let httpMock: HttpTestingController;
    let storage = [];

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
        storage = [];
        spyOn(localStorage, "getItem").and.callFake(((key: string) => storage[key] ?? null ) )
        spyOn(localStorage, "setItem").and.callFake ((key: string, bookList: string ) => {
            storage[key] = bookList;
            console.log("storage key", storage[key])
            return storage[key];
        })
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
                expect(resp).toEqual(listBook);
            }
        )

        const req = httpMock.expectOne( environment.API_REST_URL + '/book'); // AT THIS POINT  WE 'ACTIVATE' THE HTTP CAL WITH MOCK CONTROLLER
        expect(req.request.method).toBe('GET');
        req.flush(listBook); // at this point we send what we want

    });

    it("getbooksFromCart empry when localstorage null", () => {

        let listBooks = service.getBooksFromCart();
        expect(listBooks.length).toBe(0);
    });

    it("addBooksToCart when no list in localstorage", () => {
        const toast =  {
            fire: () => null
        } as any;
        
        let spyOne = spyOn(Swal, 'mixin').and.callFake(() => { 
            return toast;
        })
        service.addBookToCart(bookLocal);
        let listBooks = service.getBooksFromCart();

        expect(spyOne).toHaveBeenCalled();
        expect(listBooks.length).toBe(1);
    })

})