import {Injectable} from "@angular/core";
import {Observable, of, ReplaySubject} from 'rxjs';
import {IContainerStore} from "../_models";

@Injectable()
export class ContainerService {
  private containerDB: ReplaySubject<IContainerStore> = new ReplaySubject<IContainerStore>(1);

  getContainerDB(): Observable<IContainerStore> {
    return this.containerDB;
  }

  setContainerDB(name: string, k: string, data: any): void {
    this.containerDB.next({storeName: name, key: k, data: data});
  }
}
