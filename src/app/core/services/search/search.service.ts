import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
 
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
 
@Injectable()
export class SearchService {

	private baseUrl = "https://api.themoviedb.org/3/search";
	private apiKey = "6dc0d2605088c01254ffedbd444bc2e4";
 
	constructor(private http: Http) {}

	search(query:string, specificSearch=""): Observable<any> {

		// let specificSearch = '/movie';
		let url = this.baseUrl+specificSearch+"?api_key="+this.apiKey+"&query="+query;
		console.log(url);
		// let url = 'https://api.themoviedb.org/3/search/movie?api_key=6dc0d2605088c01254ffedbd444bc2e4&query=wonder%20woman';
		return this.http
		           .get(url)
		           .map(response => response.json().results);
	}
 
}