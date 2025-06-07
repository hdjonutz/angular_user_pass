import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  Component,
  ComponentRef,
  Inject,
  Type,
  OnInit,
  OnDestroy,
  Optional,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {take, timer} from "rxjs";
import {IItemRegister} from "../content-register-item/content-register-item.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ItemService} from "../../services/item.service";
import {EMessages, IMessages} from "../../_models";

export interface IAnotherBtns {
  name: string;
  attrKey: string;
  dataKey: Array<string>;
  formControlKey: Array<string>;
  callbackBtns: (data: any) => any;
}

export interface IDataDialogContent {
  title: string;
  message?: string;
  componentToLoad?: Type<any>;
  componentData?: any;
  component?: any;
  action?: {
    deleteItem?: boolean;
  }
}
/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.component.html',
  styleUrls: ['dialog-content.component.scss'],
})
export class DialogContentComponent implements OnInit, OnDestroy {
  @ViewChild('externalContent', { read: ViewContainerRef, static: false }) vcRef: ViewContainerRef | undefined;
  componentRef: ComponentRef<any> | undefined;

  title: string                   = null as unknown as string;
  buttonSaveDisabled: boolean     = true;
  buttonDeleteDisabled: boolean   = true;
  deleteItem: boolean             = false;

  constructor(
    public dialogRef: MatDialogRef<DialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IDataDialogContent,
    private _snackBar: MatSnackBar) {
  }

  onScroll(ev: any) {
    if (ev.target.offsetHeight + ev.target.scrollTop >= ev.target.scrollHeight) {
      console.log('on scrollllll....');
    }
  }

  ngOnInit() {
    timer(200).pipe(take(1)).subscribe(() => {
      const corporate = this.componentRef?.instance?.data?.corporate;
      this.deleteItem = this.data.action?.deleteItem || false;
      debugger;
      const componentTitle: string =
        this.componentRef?.instance.data && corporate
          ? (this.deleteItem ? `${corporate} delete` : `${corporate} edit`)
          : 'New element insert';

      this.title = this.data?.title || componentTitle;
      debugger;
      if (this.data) {
        if (this.vcRef && this.data.component) {
          this.componentRef = this.vcRef?.createComponent(this.data.component);
          this.componentRef.instance.data             = this.data.componentData;
          this.componentRef.instance.refContentDialog = this;
          this.componentRef.instance.message          = this.data.message;
        }
      }
    });
  }

  disableSaveBtn(activate: boolean) {
    this.buttonSaveDisabled = activate;
  }

  disableDeleteBtn(activate: boolean) {
    this.buttonDeleteDisabled = activate;
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onClickSaveDataFromComponent() {
    if (this.componentRef) {
      this.componentRef.instance.callSaveData().subscribe((res: IItemRegister|null) => {
        if (res) {
          this.componentRef?.destroy();
          this.dialogRef.close();
          this._snackBar.open(
            `'${res.corporate}' succesfuly saved!`,
            'OK, Great!',
            {duration: 5000});
        }
      });
    }
  }

  onClickDeleteDataFromComponent() {
    if (this.componentRef) {
      this.componentRef.instance.callDeleteData().subscribe((res: IMessages) => {
        debugger;
        if (res && res.message === EMessages.OK) {
          this.componentRef?.destroy();
          this.dialogRef.close();
          this._snackBar.open(
            `Successfully deleted!`,
            'Great!',
            {duration: 5000});
        }
      })
    }
  }
}

