import {NgModule} from "@angular/core";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MATERIAL_MODULES} from "../material.modules";

@NgModule({
  imports: [MATERIAL_MODULES]
})
export class IconRegisterModule {
  private URL_LOGO        = 'assets/logo/';
  private URL_LOGO_CROWN  = 'assets/logo_crown/';
  private iconsSVG = [
    {name: 'logoHome', fileSvg: this.URL_LOGO + 'crown-eagle-no-text_icon.svg'},
    {name: 'logoHomeCrown', fileSvg: this.URL_LOGO_CROWN + 'ic_launcher_monochrome_crown.svg'}
  ];

  constructor(private matIconRegistery: MatIconRegistry,
              private sanitizer: DomSanitizer,
  ) {
    this.iconsSVG.forEach((icon) => {
      this.matIconRegistery.addSvgIcon(icon.name, this.setPath(icon.fileSvg));
    });
  }

  private setPath(fileSvg: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(fileSvg);
  }
}
