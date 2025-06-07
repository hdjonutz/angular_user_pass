import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordRegex} from "../../pages/register/register.component";
import {MyErrorStateMatcher} from "../helpers";
import {of, Subject, take, takeUntil} from "rxjs";
import {generateUUID} from "../../helper/helper";
import {ItemService} from "../../services/item.service";
import {Observable} from "rxjs/internal/Observable";

export interface IItemRegister {
  uuid: string;
  corporate: string;
  user: string;
  pass: string;
}

@Component({
  selector: 'app-content-register-item',
  templateUrl: './content-register-item.component.html',
  styleUrl: './content-register-item.component.scss'
})
export class ContentRegisterItemComponent implements OnInit {
  @Input() data: any;
  @Input() action?: {deleteItem?: boolean};

  @Input() refContentDialog: any;

  hasError = null;
  loading = false;
  submitted = false;
  private destroy$ = new Subject<void>(); // Used for unsubscribing

  itemFormControl = new FormControl('', [
    Validators.required,
  ]);

  userFormControl = new FormControl('', [
    Validators.required,
  ]);

  passFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
    Validators.pattern(passwordRegex)
  ]);

  matcher = new MyErrorStateMatcher();
  itemForm: any;
  hide = true;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemForm = new FormGroup({
      itemFormControl: this.itemFormControl,
      userFormControl: this.userFormControl,
      passFormControl: this.passFormControl
    });
    if (this.data) {
      this.itemForm.controls.itemFormControl.setValue(this.data.corporate);
      this.itemForm.controls.userFormControl.setValue(this.data.user);
      this.itemForm.controls.passFormControl.setValue(this.data.pass);
    }
    // Subscribe to valueChanges to react to form modifications
    this.itemForm.valueChanges.pipe(
      takeUntil(this.destroy$) // Ensure to unsubscribe when component is destroyed
    ).subscribe(() => {
      if (this.refContentDialog) {
        // Update the save button's disabled state based on form validity
        this.refContentDialog.disableSaveBtn(!this.itemForm.valid);
        console.log('Form valid:', this.itemForm.valid);
      }
    });

    // You might also want to set the initial state of the save button
    // based on the form's initial validity, after form initialization
    if (this.refContentDialog) {
      this.refContentDialog.disableSaveBtn(!this.itemForm.valid);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): Observable<IItemRegister> {
    this.submitted = true;

    if (!this.itemForm.valid) {
      return of(null as unknown as IItemRegister);
    }
    this.loading = true;
    this.hasError = null;

    const itemToSave: IItemRegister = {
      uuid: this.data?.uuid || generateUUID(),
      corporate: this.itemFormControl.value + '',
      user: this.userFormControl.value + '',
      pass: this.passFormControl.value + ''
    };
    return this.itemService.setItem(itemToSave.uuid, itemToSave);
  }

  callSaveData(): Observable<IItemRegister> {
    return this.onSubmit();
  }
}
