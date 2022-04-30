import { ComponentFixture, TestBed } from '@angular/core/testing';
import TestBedExtended from 'src/test_helpers/testBedExtend';

import { ProfileParentComponent } from './profile-parent.component';

describe('ProfileParentComponent', () => {
	let component: ProfileParentComponent;
	let fixture: ComponentFixture<ProfileParentComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProfileParentComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		TestBedExtended.preConfigure();
		fixture = TestBedExtended.createComponent(ProfileParentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
