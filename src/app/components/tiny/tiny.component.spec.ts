import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyComponent } from './tiny.component';

describe('TinyComponent', () => {
  let component: TinyComponent;
  let fixture: ComponentFixture<TinyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
