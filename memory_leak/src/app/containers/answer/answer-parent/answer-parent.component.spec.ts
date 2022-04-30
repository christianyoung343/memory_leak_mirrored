import { ComponentFixture, TestBed } from '@angular/core/testing';
import TestBedExtended from 'src/test_helpers/testBedExtend';

import { AnswerParentComponent } from './answer-parent.component';

describe('AnswerParentComponent', () => {
	let component: AnswerParentComponent;
	let fixture: ComponentFixture<AnswerParentComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AnswerParentComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		TestBedExtended.preConfigure();
		fixture = TestBedExtended.createComponent(AnswerParentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
