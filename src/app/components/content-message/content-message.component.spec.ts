import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegisterItemComponent } from './content-message.component';

describe('DialogRegisterItemComponent', () => {
  let component: DialogRegisterItemComponent;
  let fixture: ComponentFixture<DialogRegisterItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogRegisterItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRegisterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
