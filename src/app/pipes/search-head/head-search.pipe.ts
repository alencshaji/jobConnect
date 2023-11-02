import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'headSearch'
})
export class HeadSearchPipe implements PipeTransform {
  transform(dataArray: any[], searchString: string, dataKeys: string[]): any {
    const result: any[] = [];

    if (!dataArray || searchString == "" || dataKeys.length === 0) {
      return dataArray;
    } else {
      dataArray.forEach((item: any) => {
        for (const key of dataKeys) {
          if (item[key].trim().toLowerCase().includes(searchString.trim().toLowerCase())) {
            result.push(item);
            break; 
          }
        }
      });
    }

    return result;
  }
}
