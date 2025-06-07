import {Component, Input, TemplateRef, ViewChildren} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: '[line50Percent]',
  templateUrl: 'line50percent.component.html',
  styleUrls: ['line50percent.component.scss']
})
export class LineFiftyPercentComponent {

  @Input() outboundData: any | undefined;
  @Input() showIcons?: boolean | undefined;
  @Input() size?: string | undefined;
  templateRef!: TemplateRef<any>;

  constructor() {}

  ngOnInit() {
    console.log(this.outboundData);
  }

}
