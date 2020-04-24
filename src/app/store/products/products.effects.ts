import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, switchMap, take, map } from 'rxjs/operators';

import { State } from '../';
import * as Dataset from '../dataset';
import * as actions from './products.actions';

@Injectable()
export class ProductsEffects {
  @Effect()
  selectItemCategory$ = this.actions$.pipe(
    ofType(actions.ProductsActionType.OPEN_EDIT_PRODUCT),
    switchMap((a: actions.OpenEditProductAction) =>
      this.store.select(Dataset.getDataset).pipe(
        take(1),
        filter((e) => !!e),
        map(
          (e) =>
            new actions.SelectItemCategoryEffectAction(
              e.itemEntities[a.payload.itemId].category
            )
        )
      )
    )
  );

  constructor(private actions$: Actions, private store: Store<State>) {}
}