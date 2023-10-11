import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Book } from "src/app/models/book.model";
import { BookService } from "src/app/services/book.service";
import { HomeComponent } from "./home.component"

const listBookTwo: Book[] = [
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
        price: 18,
        amount: 2
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 3
    }
];

fdescribe("home component", () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let service: BookService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule],
            declarations: [HomeComponent],
            providers: [
                BookService,
                // {
                //     provide: BookService,
                //     useValue: {
                //         getBooks: () => { return of(listBookTwo)}
                //     }
                // }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(BookService)
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    })

    // it("calls getBooks with service geBooks - one", () => {

    //     component.getBooks();
    // })

    it("calls getBooks with service geBooks - two", () => {
        const spy = spyOn(service, "getBooks").and.callFake(() => of(listBookTwo));
        component.getBooks();
        expect(spy).toHaveBeenCalled();
        expect(component.listBook.length).toEqual(3)
    })


})