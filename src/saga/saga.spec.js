import { call, put, take, select, takeLatest, all } from 'redux-saga/effects';
import * as Api from './../api/api';
import * as actions from './../actions';
import { getToken } from '../selectors/selectors';
import * as sags from './saga';
import * as t from '../ActionType';


describe('fetchDisk', () => {
  const token = { payload: '21yl3r1y23rylyu214ygj213afad13da' };
  const generator = sags.fetchDisk(token);
  it('save token', () => {
    expect(generator.next().value)
      .toEqual(put({
        type: t.SAVE_TOKEN,
        payload: token.payload,
      }));
  });
  it('fetch info api', () => {
    expect(generator.next().value).toEqual(call(Api.getDiskInfofo_api, token.payload));
  });
  it('fetch info success', () => {
    const info = { username: 'user name' };
    expect(generator.next(info).value).toEqual(put({
      type: t.FETCH_INFO_DISK_SUCCES,
      payload: info,
    }));
  });
});

describe('fetch resoources', () => {
  const token = {payload: '21yl3r1y23rylyu214ygj213afad13da'};
  const generator = sags.fetchDisk(token);
  it('save token', () => {
    expect(generator.next().value)
      .toEqual(put({
        type: t.SAVE_TOKEN,
        payload: token.payload,
      }));
  });
  it('fetch info api', () => {
    expect(generator.next().value).toEqual(call(Api.getDiskInfofo_api, token.payload));
  });
  it('fetch info success', () => {
    const info = { username: 'user name' };
    expect(generator.next(info).value).toEqual(put({
      type: t.FETCH_INFO_DISK_SUCCES,
      payload: info,
    }));
  });
});
