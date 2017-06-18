import { Pipe, PipeTransform } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safe'
})

/**Pipe que permite acceder a enlaces que el navegador
    determina como inseguros*/
export class SafeVideo implements PipeTransform {

    constructor( private sanitizer: DomSanitizer){}
    
    transform(url: string){
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}