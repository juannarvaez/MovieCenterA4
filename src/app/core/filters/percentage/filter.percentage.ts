import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'percentage'
})

/**Transform add porcentage simbol at the en of the number and cut some decimals, it depends of limit*/
export class Percentage implements PipeTransform {

    transform(percentage: number, limit: number ){
        return percentage.toString().substring(0,limit)+'%';
    }
}