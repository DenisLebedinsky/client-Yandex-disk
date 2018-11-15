import dataFn from './data';
import * as t from '../actions/ActionType';

describe('test reducer data', () => {

  it('fetch resoure request', () => {
    const action = { type: t.FETCH_RESOURCES_REQUEST };
    const initialState = {};
    expect(dataFn(initialState, action)).toEqual({});
  });

  it('data  reducer succes', () => {
    const action = {
        type: t.FETCH_RESOURCES_SUCCES,
        payload: {
          _embedded: {
            sort: '',
            items: [
              {
                name: 'в',
                exif: {},
                created: '2018-10-28T16:00:02+00:00',
                resource_id: '743840448:9112b21d6f3f42b6ba56e01d9a6269a58f544cdf947f49af9a30ee01ca4521e0',
                modified: '2018-10-28T16:00:02+00:00',
                path: 'disk:/в',
                comment_ids: {
                  private_resource: '743840448:9112b21d6f3f42b6ba56e01d9a6269a58f544cdf947f49af9a30ee01ca4521e0',
                  public_resource: '743840448:9112b21d6f3f42b6ba56e01d9a6269a58f544cdf947f49af9a30ee01ca4521e0',
                },
                type: 'dir',
                revision: 1540742402356000,
              },
              {
                name: 'н',
                exif: {},
                created: '2018-10-28T15:59:57+00:00',
                resource_id: '743840448:cacfd70b7a5f4aab926cc451456f438ab27e9e9e5bd7429dbab3203db2bb33c0',
                modified: '2018-10-28T15:59:57+00:00',
                path: 'disk:/н',
                comment_ids: {
                  private_resource: '743840448:cacfd70b7a5f4aab926cc451456f438ab27e9e9e5bd7429dbab3203db2bb33c0',
                  public_resource: '743840448:cacfd70b7a5f4aab926cc451456f438ab27e9e9e5bd7429dbab3203db2bb33c0',
                },
                type: 'dir',
                revision: 1540742397348000,
              },
            ],
          },
        },
      }
    ;
    const initialState = {};
    expect(dataFn(initialState, action)).toEqual({
      sort: '',
      items: [
        {
          name: 'в',
          exif: {},
          created: '2018-10-28T16:00:02+00:00',
          resource_id: '743840448:9112b21d6f3f42b6ba56e01d9a6269a58f544cdf947f49af9a30ee01ca4521e0',
          modified: '2018-10-28T16:00:02+00:00',
          path: 'disk:/в',
          comment_ids: {
            private_resource: '743840448:9112b21d6f3f42b6ba56e01d9a6269a58f544cdf947f49af9a30ee01ca4521e0',
            public_resource: '743840448:9112b21d6f3f42b6ba56e01d9a6269a58f544cdf947f49af9a30ee01ca4521e0',
          },
          type: 'dir',
          revision: 1540742402356000,
        },
        {
          name: 'н',
          exif: {},
          created: '2018-10-28T15:59:57+00:00',
          resource_id: '743840448:cacfd70b7a5f4aab926cc451456f438ab27e9e9e5bd7429dbab3203db2bb33c0',
          modified: '2018-10-28T15:59:57+00:00',
          path: 'disk:/н',
          comment_ids: {
            private_resource: '743840448:cacfd70b7a5f4aab926cc451456f438ab27e9e9e5bd7429dbab3203db2bb33c0',
            public_resource: '743840448:cacfd70b7a5f4aab926cc451456f438ab27e9e9e5bd7429dbab3203db2bb33c0',
          },
          type: 'dir',
          revision: 1540742397348000,
        },
      ],
    });
  });

});

