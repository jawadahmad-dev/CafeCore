import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHome } from './update-home';

describe('UpdateHome', () => {
  let component: UpdateHome;
  let fixture: ComponentFixture<UpdateHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
