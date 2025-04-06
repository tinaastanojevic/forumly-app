import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number): any {

    const isTruncated=value.length > limit;

    if (isTruncated) {
      return {
        text:
          value.slice(0, limit) + '...',
        isTruncated
      }
    }
    else {
      return {
        text:
          value,
        isTruncated
      }
    }

  }

}
