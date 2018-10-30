import * as actions from './index';
import * as t from '../ActionType';


describe('test actions', () => {

  it('fetch_info_disk_request', () => {
    const token = 'wdaw12edswqd12ej1kbh12v3g131v42b31';
    expect(actions.fetch_info_disk_request(token)).toEqual({
      type: t.FETCH_INFO_DISK_REQUEST,
      payload: token,
    });
  });


  it('fetch_info_disk_succes', () => {
    const info = {
      user: {
        country: 'ru',
        login: 'DiskAppReact',
        display_name: 'DiskAppReact',
        uid: '743840448',
      },
      revision: 1540742404911849,
    };
    expect(actions.fetch_info_disk_request(info)).toEqual({
      type: t.FETCH_INFO_DISK_REQUEST,
      payload: info,
    });
  });

  it('fetch_info_disk_failed', () => {
    const e = { type: t.FETCH_INFO_DISK_FAILED, message: 'Error test code 401' };
    expect(actions.fetch_info_disk_failed(e)).toEqual({
      type: t.FETCH_INFO_DISK_FAILED,
      message: 'Error test code 401'
    });
  });

});

