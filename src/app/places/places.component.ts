import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../../models/place';
import { PaginatePipe } from 'ngx-pagination';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit {
  page: number = 1;
  PlacesFromService: Place[] = [];

  constructor(
    private PlacesService: PlacesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchPlaces();

    this.route.queryParams.subscribe((params) => {
      console.log(params);
      if (params.order === 'alf-asc') {
        this.asc();
      } else if (params.order === 'alf-dsc') {
        this.desc();
      }
    });
  }

  counter(i: number) {
    return new Array(Math.trunc(i));
}

checkFull(i: number, rating: number){
  if (i+1 <= rating) {
    return true;
  }
  else
  {
    return false;
  }
  
}

checkHalf(i: number, rating: number){
  if (rating > i) {
    return true;
  }
  else
  {
    return false;
  }
  
}


  reset() {
    this.PlacesFromService.sort((a, b) =>
      a.Id > b.Id ? 1 : b.Id > a.Id ? -1 : 0
    );
    this.page = 1;
    this.router.navigate(['/'], { queryParams: {} });
  }

  asc() {
    this.PlacesFromService.sort((a, b) =>
      a.Name > b.Name ? 1 : b.Name > a.Name ? -1 : 0
    );
    this.page = 1;
    this.router.navigate(['/'], { queryParams: { order: 'alf-asc' } });
  }

  desc() {
    this.PlacesFromService.sort((a, b) =>
      a.Name < b.Name ? 1 : b.Name < a.Name ? -1 : 0
    );
    this.page = 1;
    this.router.navigate(['/'], { queryParams: { order: 'alf-dsc' } });
  }

  private fetchPlaces(): any {
    this.PlacesFromService = this.PlacesService.getPlaces();
  }
}
