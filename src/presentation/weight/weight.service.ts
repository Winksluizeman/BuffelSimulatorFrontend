import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeightDto} from '../../infrastructure/dto/weight.dto';

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  private readonly apiUrl = 'http://localhost:8080/Weight';

  constructor(private http: HttpClient) {}

  getAll(): Observable<WeightDto[]> {
    return this.http.get<WeightDto[]>(this.apiUrl);
  }

  save(exercise: WeightDto): Observable<WeightDto> {
    return this.http.post<WeightDto>(this.apiUrl, exercise);
  }
}
