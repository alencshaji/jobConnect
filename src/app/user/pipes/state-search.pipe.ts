import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateSearch'
})
export class StateSearchPipe implements PipeTransform {

  transform(dataArray: any[], searchStateString: string, dataKeys: string[]): any {
    const result: any[] = [];

    if (!dataArray || searchStateString == "" || dataKeys.length === 0) {
      return dataArray;
    } else {
      dataArray.forEach((item: any) => {
        for (const key of dataKeys) {
          if (item[key].trim().toLowerCase().includes(searchStateString.trim().toLowerCase())) {
            result.push(item);
            break; 
          }
        }
      });
    }

    return result;
  }
}
