import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValue'
})
export class keyValueObjectPipe implements PipeTransform {

  transform(data: {[k: string]: any}, key: string, uuidIdxName: string, uuidChildrenName: string, uuidKey: string, uuidPath: Array<string>, uuidKeyPath: Array<string>): Array<any> {
    let arr: Array<any> = [];

    const getLength = (item: any): number => {
      return typeof item == 'string'
        ? 0
        : (Array.isArray(item)
          ? item.length : Object.keys(item).length);
    };

    Object.keys(data[key]).map((k: string, idx) => {
      const children = getLength(data[key][k]);
      arr.push({
        [k]: data[key][k],
        [uuidIdxName]: idx,
        [uuidChildrenName]: children,
        [uuidKey]: k,
        uuidKeyPath: JSON.parse(JSON.stringify(uuidKeyPath)),
        uuidPath: JSON.parse(JSON.stringify(uuidPath))
      });
    });

    return arr;
  }
}

// https://www.tektutorialshub.com/angular/ngtemplateoutlet-in-angular/
