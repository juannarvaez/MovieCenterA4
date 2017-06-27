import { Pipe, PipeTransform } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safe'
})

/** This pipe helps to make the url safe, to use it for example on a iframe, as is the case on this page*/
export class SafeVideo implements PipeTransform {

    constructor( private sanitizer: DomSanitizer){}
    
    transform(url: string){
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
