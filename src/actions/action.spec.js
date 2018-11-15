import * as actions from './index';
import * as t from './ActionType';


describe('test actions', () => {

  it('Fetch Info Disk Request', () => {
    const token = 'wdaw12edswqd12ej1kbh12v3g131v42b31';
    expect(actions.fetchInfoDiskRequest(token)).toEqual({
      type: t.FETCH_INFO_DISK_REQUEST,
      payload: token,
    });
  });


  it('Fetch Info Disk Succes', () => {
    const info = {
      user: {
        country: 'ru',
        login: 'DiskAppReact',
        display_name: 'DiskAppReact',
        uid: '743840448',
      },
      revision: 1540742404911849,
    };
    expect(actions.fetchResourcesSucces(info)).toEqual({
      type: t.FETCH_RESOURCES_SUCCES,
      payload: info,
    });
  });

  it('Fetch Info Disk Failed', () => {
    const e = { type: t.FETCH_INFO_DISK_FAILED, message: 'Error test code 401' };
    expect(actions.fetchInfoDiskFailed(e)).toEqual({
      type: t.FETCH_INFO_DISK_FAILED,
      message: 'Error test code 401',
    });
  });

});

