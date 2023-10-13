import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavComponent } from "./nav.component";
// import  { RouterTestingModule } from '@angular/router/testing';
import { Route, Router } from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";

// class testCompRoure {};

const mockRouter = {
    navigate: () => {}
}


describe("Nav component", () => {

    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;
    // const routes: Route[] = [
    //     { path: 'home', component: testCompRoure},
    //     { path: 'cart', component: testCompRoure}

    // ]

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
            //     RouterTestingModule.withRoutes(
            //         routes
            //     )
            ],
            declarations: [NavComponent],
            providers: [{
                provide: Router,
                useValue: mockRouter
            }],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
               
    });

    it("should create", () => expect(component).toBeTruthy());
    
    it ("should navigate two", () => {
        const router = TestBed.inject(Router);
        const paths = ['home', 'cart']
        let spyOne = spyOn(router, 'navigate');
        component.navTo(paths[1]);
        component.navTo('');
        expect(spyOne).toHaveBeenCalledWith([`/${paths[1]}`]);

    });
});