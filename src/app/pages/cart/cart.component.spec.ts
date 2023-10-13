import { ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { CommonModule } from '@angular/common';
import { CartComponent } from "./cart.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from "src/app/services/book.service";
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";
import { By } from "@angular/platform-browser";

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

fdescribe(
    "cartComponent", () => {
        
        let cartComponent: CartComponent;
        let fixture: ComponentFixture<CartComponent>;
        let service: BookService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ HttpClientTestingModule, CommonModule],
                declarations: [CartComponent],
                providers: [BookService, CartComponent],
                schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
            }).compileComponents();
        });
        
        beforeEach(() => {
            fixture = TestBed.createComponent(CartComponent);
            cartComponent = fixture.componentInstance;
            fixture.detectChanges();
            service = fixture.debugElement.injector.get(BookService);
            spyOn(service, 'getBooksFromCart').and.callFake(() => listBook)

        });

        it("se crea cart", () => {
            expect(cartComponent).toBeTruthy();
        })

        // it("se crea cart", inject([CartComponent], (testComp: CartComponent) => {
        //     expect(testComp).toBeTruthy();
        // }));

        xit("getTotalPrice return correct amount", () => {
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
            // const listCartBook: Book[] = [listBook[2], listBook[3]];
            
            const spyOne = spyOn(service, "removeBooksFromCart").and.callFake(() => null);

            cartComponent.onClearBooks();
            expect(spyOne).toHaveBeenCalled();
            expect(cartComponent.listCartBook.length).toEqual(0);
 

        });

        it("when listComponent empty h5 element shows empty tidtle", () => {
            cartComponent.listCartBook = listBook;
            fixture.detectChanges();
            console.log("comp listCartBook length", cartComponent.listCartBook.length)
            const elementEmpty = fixture.debugElement.query(By.css('#titleCardEmpty'));
            
            console.log("elementEmpty:", elementEmpty)
            
            expect(elementEmpty).toBeTruthy()
        })
    }
)