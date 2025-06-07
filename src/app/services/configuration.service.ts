import {Injectable} from "@angular/core";
import * as confData from "../config/config";

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  private configService: Configuration = null as any;

  constructor() {
    this.configService = Configuration.create();
  }

  public getConfiguration(): Configuration {
    return this.configService;
  }
  public getDescription(): string {
    return (this.configService as any).projDescription;
  }
  public getApiUrl(): string {
    return (this.configService as any).apiUrl;
  }
  public getVersion(): string {
    return (this.configService as any).version;
  }
  public getHost(): string {
    return (this.configService as any).host;
  }
  public getPort(): string {
    return (this.configService as any).port;
  }
  public getProxy(): string {
    return (this.configService as any).proxy;
  }
}

class Configuration {
  private static config: any = confData.config;

  private projName: string = null as any;
  private projDescription: string = null as any;
  private version: string = null as any;
  private apiUrl: string = null as any;
  private host: string = null as any;
  private port: number = null as any;
  private proxy: boolean = null as any;

  constructor(projName: string,
              projDescription: string,
              version: string,
              apiUrl: string,
              host: string,
              port: number,
              proxy: boolean,
  ) {
    this.projName = projName;
    this.projDescription = projDescription;
    this.version = version;
    this.apiUrl = apiUrl;
    this.host = host;
    this.port = port;
    this.proxy = proxy;
  }
  static create(): Configuration {
    return new this(
      this.config.projName,
      this.config.nameProj,
      this.config.version,
      this.config.apiUrl,
      this.config.host,
      this.config.port,
      this.config.proxy);
  }
}
