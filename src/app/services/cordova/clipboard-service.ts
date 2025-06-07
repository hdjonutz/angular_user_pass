import {Injectable} from "@angular/core";

const _window = () => {
  return window as any; // cordova.plugins.clipboard.copy
}

@Injectable()
export class ClipboardService {
  private isSupported: boolean = false;
  private clipboard: any = null;

  constructor() {
    this.isSupported = _window()?.cordova?.plugins?.clipboard || false;
    if (this.isSupported) {
      this.clipboard = _window()?.cordova?.plugins?.clipboard;
    }
  }

  copy(text: string): void {
    if (this.isSupported) {
      this.clipboard.copy(text);
    }
  }

}
