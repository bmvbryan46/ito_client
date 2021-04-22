import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenMenuComponent } from './imagen-menu.component';

describe('ImagenMenuComponent', () => {
  let component: ImagenMenuComponent;
  let fixture: ComponentFixture<ImagenMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
