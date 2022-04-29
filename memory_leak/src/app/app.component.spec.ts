import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import TestBedExtended from 'src/test_helpers/testBedExtend';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer/footer.component';
import { HeaderComponent } from './header/header/header.component';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				AppComponent,
				HeaderComponent,
				FooterComponent
			]
		}).compileComponents();
		TestBedExtended.preConfigure();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;

		expect(app).toBeTruthy();
	});

	it(`should have as title 'memory_leak'`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;

		expect(app.title).toEqual('memory_leak');
	});

	it('should render content', () => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();

		const compiled = fixture.nativeElement as HTMLElement;
		
		expect(compiled.querySelector('body')).toBeTruthy();
	});
});
