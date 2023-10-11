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
            expect(amount).toEqual(114);
            expect(amount).not.toBeNull();
        })

        it("input adds a books", () => {
            const action: string = "plus";
            const book: Book = listBook[2];
            
            // const service = fixture.debugElement.injector.get(BookService);
            // const serviceNotGood = cartComponent["_bookService"];
            // const serviceUgly = (cartComponent as any)._bookService;
            
            const spyOne = spyOn(service, "updateAmountBook").and.callFake(() => null);
            const spyTwo = spyOn(cartComponent, "getTotalPrice").and.callFake((_listBook) => 23)

            cartComponent.onInputNumberChange(action, book);
            expect(spyOne).toHaveBeenCalled();
            expect(spyTwo).toHaveBeenCalled();
            expect(cartComponent.totalPrice).toEqual(23);

        })

        // public onInputNumberChange(action: string, book: Book): void {
        //     const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
        //     book.amount = Number(amount);
        //     this.listCartBook = this._bookService.updateAmountBook(book);
        //     this.totalPrice = this.getTotalPrice(this.listCartBook);
        //   }
    }
)