import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'percentage'
})

/**Pipe que permite acceder a enlaces que el navegador
    determina como inseguros*/
export class Percentage implements PipeTransform {

    
    transform(percentage: number, limit: number ){
        return percentage.toString().substring(0,limit)+'%';
    }
}