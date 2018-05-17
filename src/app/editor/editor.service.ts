import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, pipe } from 'rxjs';
import { Dialog } from './dialog';
import { HttpClient } from '@angular/common/http';
import { EditorDialogResponse } from './editor-dialog-response';
import { map } from 'rxjs/operators/map';
import { filter, catchError } from 'rxjs/operators';

@Injectable()
export class EditorService {
  // 请求base url
  private apiURL = '/api/sceneDialog';

  public dialogs: Observable<Array<Dialog>>;

  constructor(private http: HttpClient) { }

  /**
   * @description 批量更新
   * @param {Array<Dialog>} dialogs 会话数组
   */
  public editDialogs(dialogs: Array<Dialog>): Observable<Array<Dialog>> {
    return this.http.post<EditorDialogResponse>(this.apiURL + '/editJudge', {
      scenesJson: dialogs
    }).pipe(
      map( // tap ?
        (res: EditorDialogResponse) => {
          if (res.status === 0) {
            return <Array<Dialog>> res.data;
          } else {
            return <Array<Dialog>> [];
          }
        }
      )
    );
  }
  /**
   * @description 获得会话数组
   * @param {string} groudId 会话组id
   */
  public getDialogs(groupId: string): Observable<Array<Dialog>> {
    const response = this.http.get<EditorDialogResponse>((this.apiURL) + '/listSceneDialog',{
      params: {
        groupId
      }
    }).pipe(
      map(
        (res: EditorDialogResponse) => {
          if (res.status === 0) {
            return <Array<Dialog>> res.data;
          } else {
            return <Array<Dialog>> [];
          }
        }
      )
    );
    this.dialogs = response;
    return response;
  }
  /**
   * @description 获得一个会话
   * @param {string} uuid 会话uuid
   */
  public getDialog(uuid: string): Observable<Dialog> {
    return this.dialogs.pipe(
      filter(
        (res: Array<Dialog>) => res.length > 0
      ),
      map(
        (res: Array<Dialog>) => {
          return res.find(it => it.uuid === uuid);
        }
      ),
      catchError(err => {
        const ax = new Observable<Dialog>();
        return ax;
      })
    );
  }
  /**
   * @description 筛选一个类别的dialog
   * @param {number} type dialogType
   */
  public getDialogsByType(type: number): Observable<Array<Dialog>> {
    return this.dialogs.pipe(
      map(
        (res: Array<Dialog>) => {
          return res.filter(it => it.dialogType === type && (it.nextDialog === '' || it.nextDialog === null));
        }
      )
    );
  }
  /**
   * @description 单独新增一个节点
   * @param {Dialog} dialog 会话节点
   */
  public addDialog(dialog: Dialog): Observable<Array<Dialog>> {
    const response = this.http.post<EditorDialogResponse>(this.apiURL + '/editSceneDialog', dialog)
    .pipe(
      map(
        (res: EditorDialogResponse) => {
          if (res.status === 0) {
            return <Array<Dialog>> res.data;
          } else {
            console.warn(res.message);
            return <Array<Dialog>> [];
          }
        }
      )
    );
    return response;
  }
  /**
   * @description 删除一个dialog
   * @param {number} id 当前删除的 dialog id
   */
  public removeDialog(id: number): Observable<{message: string, status: number}> {
    return this.http.get<{message: string, status: number}>(this.apiURL + '/delSceneDialog',{
      params: {
        id: id.toString()
      }
    });
  }

  private handleError< T >(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed:${error.message}`);
      return Observable.of(result as T);
    };
  }
}
