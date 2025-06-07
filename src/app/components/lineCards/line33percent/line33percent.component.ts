import {Component, Input, TemplateRef, ViewChildren} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: '[line33Percent]',
  templateUrl: 'line33percent.component.html',
  styleUrls: ['line33percent.component.scss']
})
export class LineThirtyThreePercentComponent {

  @Input() outboundData: any | undefined;
  @Input() showIcons?: boolean | undefined;
  @Input() size?: string | undefined;
  templateRef!: TemplateRef<any>

  constructor() {}

  ngOnInit() {
    console.log(this.outboundData);
  }

}
