import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyNavigatorComponent } from './key-navigator.component';

describe('KeyNavigatorComponent', () => {
  let component: KeyNavigatorComponent;
  let fixture: ComponentFixture<KeyNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
