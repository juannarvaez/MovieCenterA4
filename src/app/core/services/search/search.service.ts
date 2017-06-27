import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
 
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
 
@Injectable()
export class SearchService {

	private baseUrl = "https://api.themoviedb.org/3/search";
	private apiKey = "6dc0d2605088c01254ffedbd444bc2e4";
 
	constructor(private http: Http) {}

	/**Metodos encargados de redireccionar al usuario a otro componente
   * @param {query:number} What we gonna search on the data base
   * @param {spicificSearch:number} where we gonna get the information, movies? persons? this params indicates that
   * @return {:void} */
	search(query:string, specificSearch=""): Observable<any> {
		let url = this.baseUrl+specificSearch+"?api_key="+this.apiKey+"&query="+query;
		console.log(url);
		return this.http
		           .get(url)
		           .map(response => response.json().results);
	}
 
}