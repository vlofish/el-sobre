import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Sobre } from '../interfaces/sobre';

@Injectable()
export class SobreService {

	private MOCKED_SOBRE_DATA: Sobre[] = [
    {id: 0, name: 'Xpense01', budget: 0},
    {id: 1, name: 'Xpense02', budget: 0},
    {id: 2, name: 'Xpense03', budget: 0}
  ]

  constructor() { }

  getSobreData(): Observable<Sobre[]> {
  	return of(this.MOCKED_SOBRE_DATA)
  }

}
