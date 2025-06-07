import {Component, Input, OnInit, ViewChild, AfterViewInit} from "@angular/core"; // Add AfterViewInit
import moment from "moment";
import {isAndroidDevice, _window} from "../../helper/helper";
import {LineFiftyPercentComponent} from "../../components/lineCards/line50percent/line50percent.component";

@Component({
  selector: 'aio-footer',
  templateUrl: 'footer-module.component.html',
  styleUrls: ['footer-module.component.scss']
})
export class FooterModuleComponent implements OnInit, AfterViewInit { // Implement AfterViewInit

  isAndroid = isAndroidDevice() || _window().outerWidth < 450 || _window().outerHeight < 720;
  rightsReserved = `© ${moment().year()}. All Rights Reserved.`; //

  childrenDraw: Array<Array<string>> = [
    ['search Email'],
    ['Features', 'Pricing', 'Services'],
    ['facebook', 'twitter', 'facebook-messenger', 'pinterest-fill']
  ];

  footer: Array<Array<string>> = [
    ['About', 'Privacy', 'Contacts']
  ]
  SIZE = {
    'FULL': 'full'
  }

  @Input() versionInfo: any | undefined;
  styleLgExp = { backgroundColor: 'red', maxWidth: '1280px', margin: 'auto'};

  @ViewChild('rights') lineFiftyPercentComponent!: LineFiftyPercentComponent;

  // New property to hold the templateRef after view init
  public rightsTemplateRef: any;

  get currentYear(): number {
    return new Date().getFullYear();
  }

  ngOnInit(): void {
    console.log('isAndroid: ', isAndroidDevice(), 'WIDTH: ' + _window().outerWidth,  'HEIGHT: ' +_window().outerHeight);
  }

  ngAfterViewInit(): void {
    // Assign the templateRef after the view has been initialized
    if (this.lineFiftyPercentComponent) {
      this.rightsTemplateRef = this.lineFiftyPercentComponent.templateRef;
    }
  }
}
