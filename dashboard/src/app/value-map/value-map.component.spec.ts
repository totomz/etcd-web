import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueMapComponent } from './value-map.component';

describe('ValueMapComponent', () => {
  let component: ValueMapComponent;
  let fixture: ComponentFixture<ValueMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
