import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as Api from './../api/api';
import * as sags from './saga';
import * as t from '../actions/ActionType';

describe('redux saga', () => {
  const gen = sags.default();
  const eff = gen.next().value;

  it('main saga', () => {
    expect(eff).toEqual(
      all([
        takeLatest(t.FETCH_INFO_DISK_REQUEST, sags.fetchDisk),
        takeLatest(t.FETCH_RESOURCES_REQUEST, sags.fetchResources),
        takeLatest(t.DEL_FOLDER_REQUST, sags.delFolder),
        takeLatest(t.CREATE_FOLDER_REQUST, sags.createFolder),
        takeLatest(t.UPLOAD_FILE_REQUST, sags.uploadFile),

      ]),
    );
  });
});

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
    expect(generator.next().value).toEqual(call(Api.getDiskInfofoApi, token.payload));
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
    expect(generator.next().value).toEqual(call(Api.getDiskInfofoApi, token.payload));
  });
  it('fetch info success', () => {
    const info = { username: 'user name' };
    expect(generator.next(info).value).toEqual(put({
      type: t.FETCH_INFO_DISK_SUCCES,
      payload: info,
    }));
  });
  it('finished', () => {
    const info = { username: 'user name' };
    expect(generator.next(info).done).toEqual(true);
  });
});
