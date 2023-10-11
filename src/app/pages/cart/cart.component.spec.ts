import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CartComponent } from "./cart.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from "src/app/services/book.service";
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";

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

describe(
    "cartComponent", () => {
        
        let cartComponent: CartComponent;
        let fixture: ComponentFixture<CartComponent>;
        let service: BookService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ HttpClientTestingModule],
                declarations: [CartComponent],
                providers: [BookService],
                schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(CartComponent);
            cartComponent = fixture.componentInstance;
            fixture.detectChanges();
            service = fixture.debugElement.injector.get(BookService);

        });

        it("se crea cart", () => {
            expect(cartComponent).toBeTruthy();
        })

        it("getTotalPrice return correct amount", () => {
            const amount = cartComponent.getTotalPrice(listBook)
            expect(amount).toEqual(106);
            expect(amount).not.toBeNull();
        })

        it("input adds a books", () => {
            const action: string = "plus";
            const book: Book = listBook[2];
            
            //three possible ways to assign an injected service
            // const service = fixture.debugElement.injector.get(BookService);
            // const serviceNotGood = cartComponent["_bookService"];
            // const serviceUgly = (cartComponent as any)._bookService;
            
            const spyOne = spyOn(service, "updateAmountBook").and.callFake(() => null);
            const spyTwo = spyOn(cartComponent, "getTotalPrice").and.callFake((_listBook) => 23)

            cartComponent.onInputNumberChange(action, book);
            expect(spyOne).toHaveBeenCalled();
            expect(spyTwo).toHaveBeenCalled();
            expect(cartComponent.totalPrice).toEqual(23);
            expect(book.amount).toEqual(8);
            expect(book.amount === 8).toBeTrue;

        });

        it("Clears cart correctly", () => {
            cartComponent.listCartBook = listBook;
            const spyOne = spyOn(service, "removeBooksFromCart").and.callFake(() => null);

            cartComponent.onClearBooks();
            expect(spyOne).toHaveBeenCalled();
            expect(cartComponent.listCartBook.length).toEqual(0);
 

        });

        // direct test to private method -  not recommended
        it("Clears cart correctly", () => {
            cartComponent.listCartBook = listBook;
            const spyOne = spyOn(service, "removeBooksFromCart").and.callFake(() => null);

            (cartComponent as any)._clearListCartBook();
            expect(cartComponent.listCartBook.length).toEqual(0);
        });
    }
)