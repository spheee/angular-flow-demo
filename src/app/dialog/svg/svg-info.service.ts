import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class SvgInfoService {

  private _svgGroupId: string;
  constructor(private cookieService:CookieService) {
    
   }

}
