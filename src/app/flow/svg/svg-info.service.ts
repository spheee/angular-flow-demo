import { Injectable } from '@angular/core';
import { Guid } from '../../common/guid';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class SvgInfoService {
  private _svgGroupId: string;
  constructor(private cookieService: CookieService) { }
  public get svgGroupId(): string {
    this._svgGroupId = this.cookieService.get('flow-svg-group-id');
    if (this._svgGroupId === undefined) {
      this._svgGroupId = new Guid().newGuid();
      this.cookieService.put('flow-svg-group-id', this._svgGroupId);
    }
    return this._svgGroupId;
  }
  public set svgGroupId(v: string) {
    this._svgGroupId = v;
    this.cookieService.put('flow-svg-group-id', this._svgGroupId);
  }
}
