import {Component, Input, OnInit} from '@angular/core';
import {MyErrorStateMatcher} from "../helpers";
import {map, Subject, switchMap} from "rxjs";
import {ItemService} from "../../services/item.service";
import {Observable} from "rxjs/internal/Observable";
import {IItemRegister} from "../content-register-item/content-register-item.component";
import {IMessages} from "../../_models";


@Component({
  selector: 'app-content-message-item',
  templateUrl: './content-message.component.html',
  styleUrl: './content-message.component.scss'
})
export class ContentMessageComponent implements OnInit {
  @Input() data: any;
  @Input() action?: {deleteItem?: boolean};
  @Input() refContentDialog: any;
  @Input() message: string = '';

  private destroy$ = new Subject<void>(); // Used for unsubscribing

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    debugger;
    this.refContentDialog.disableDeleteBtn(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  deteleItem(): Observable<IMessages> {
    return this.itemService.deleteItem(this.data);
  }

  callDeleteData(): Observable<IMessages> {
    return this.deteleItem();
  }
}
