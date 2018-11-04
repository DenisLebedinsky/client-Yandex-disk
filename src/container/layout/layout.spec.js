import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from './Layout';

const mockFetchInfo = jest.fn();
const mockFetchResources = jest.fn();

describe('Layout container', () => {

  const props = { // описываем props
      token: 'awdfq12ew',
    info:{
      display_name:'TestName'
    },
      data: {
        items: [
          {
            name: 'folder1',
            resource_id: '12321434123',
            type: 'dir',
          },
          {
            name: 'folder2',
            resource_id: '1233244123',
            type: 'dir',
          },
        ],
      },
      currentPath: [],
      location: '/',
    fetchInfoDiskRequest: mockFetchInfo,
    fetchResourcesRequest: mockFetchResources,
    type:'dir'
    };

describe('Layout container', () => {

  const LayoutContainer = shallow(<Layout  {...props} key='12732834'/>);

  it('snapshot', () => {
    // console.log(LayoutContainer.debug())
    expect(LayoutContainer).toMatchSnapshot();
  });

  //проверяем вызов функции fetchInfoDiskRequest
  it('function fetch info', () => {
    expect(mockFetchInfo).toHaveBeenCalledTimes(1);
  });
  //проверяем вызов функции fetchResourcesRequest
  it('function fetch resorces', () => {
    expect(mockFetchResources).toHaveBeenCalledTimes(1);
  });
});
})
;
