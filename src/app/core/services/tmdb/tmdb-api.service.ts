import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
 
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TMDBAPIService {

	private baseUrl = "https://api.themoviedb.org/3/";
	private apiKey = "518d83af872f927b98cfe36a90cd05b0";
	private language = "en-US";
	private adult = "false";

	constructor(private http: Http){}


	//Abstract funtion to get info in json format from the tmdb api 
	getFromTMDB(search: string, extra_params=""): Observable<any>{
		var url = this.baseUrl+search+"?api_key="+this.apiKey+"&language="+this.language+extra_params;
		return this.http.get(url)
			.map(response => {
				return response.json();
			});
	}

	//=========================== MOVIES ===============================
	getPopularMovies():Observable<any>{
		return this.getFromTMDB('movie/popular');
	}

	getMovieDetail(id: string):Observable<any>{
		return this.getFromTMDB('movie/'+id);
	}

	getTopMovies(): Observable<any>{
		return this.getFromTMDB('movie/top_rated');
	}

	getUpcomingMovies():Observable<any>{
		return this.getFromTMDB('movie/now_playing');
	}

	//=========================== PERSONS ==============================
	getPopularPersons():Observable<any>{
		return this.getFromTMDB('person/popular');
	}

	getDetailPerson(id: string): Observable<any>{
		return this.getFromTMDB('person/'+id);
	}

	getMovieCreditsPerson(id: string):Observable<any>{
		return this.getFromTMDB('person/'+id+'/movie_credits');
	}



	searchMovie(): Observable<any> {
  	//var url= 'app/heroes';
	// var url = "http://api.themoviedb.org/3/discover/movie%3Fpage=1&include_adult=false&sort_by=popularity.desc&api_key=802cd9bec58e75474a66bfa717fd1106";
		// var url = "https://api.themoviedb.org/3/movie/popular?api_key=802cd9bec58e75474a66bfa717fd1106";
		// // var url = 'http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo';
		// return this.http.get(url)
		// .map(response => {return response.json()});
		return this.getFromTMDB('movie/popular');
	} 

}
