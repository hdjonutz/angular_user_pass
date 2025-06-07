
import {Component, OnInit} from '@angular/core';
import {ClipboardService} from "../../services/cordova/clipboard-service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ItemService} from "../../services/item.service";
import {UserService} from "../../services/user.service";
import {switchMap, tap, filter, of} from "rxjs";
import {User} from "../../_models";
import {
  ContentRegisterItemComponent,
  IItemRegister
} from "../../components/content-register-item/content-register-item.component";
import {DialogContentComponent, IDataDialogContent} from "../../components/dialog/dialog-content.component";
import {MatDialog} from "@angular/material/dialog";
import {ContentMessageComponent} from "../../components/content-message/content-message.component";



@Component({
  selector: 'home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  data: Array<IItemRegister> = [];
  subscriber: any = null;
  constructor(
    private clipboardService: ClipboardService,
    private itemService: ItemService,
    private userService: UserService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) {
  }

  onDeviceReady() {
    const device: any = (window as any).device;
    console.log('onDeviceReady has been called. Lets start loading JS files.');
    console.log('Platform: ', device.platform);
    console.log('cordova: ', device.cordova);
    console.log('sdkVersion: ', device.sdkVersion);
    console.log('version: ', device.version);
    console.log('uuid: ', device.uuid);
  }

  ngOnInit() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    this.refresh();
  }

  refresh() {
    this.subscriber?.unsubscribe();
    this.subscriber = this.userService.getUser().pipe(
      filter((user: User | null) => user !== null),
      tap((user) => console.log('USER login: ', user)),
      switchMap((user: User) => this.itemService.getItemsByUser(user)),
    ).subscribe({
      next: (items: Array<IItemRegister>) => {
        console.log('Successfully fetched items:', items);
        this.data = items;
      },
      error: (err) => console.error('Error fetching items:', err),
      complete: () => console.log('Observable completed.')
    });
  }

  copy(pass: string): void{
    this.clipboardService.copy(pass);
    this._snackBar.open(
      `Copy succesfull!`,
      'OK!',
      {duration: 3000});
  }

  edit(data?: IItemRegister|null): void {
    const dataToSend: IDataDialogContent = {
      title: '',
      message: null as unknown as string,
      component: ContentRegisterItemComponent,
      componentData: data,
    }
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '80%',
      data: dataToSend
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.refresh();
    });
  }

  delete(data: IItemRegister) {
    const dataToSend: IDataDialogContent = {
      title: 'Delete',
      message: 'You are shore that you want to delete this element?',
      component: ContentMessageComponent,
      componentData: data,
      action: {deleteItem: true}
    }
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '80%',
      data: dataToSend
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.refresh();
    });
  }
}
