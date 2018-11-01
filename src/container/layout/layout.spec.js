import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from './Layout';

describe('Layout container', () => {

  const props = { // описываем props
    token: '',
    data: {
      item: [
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
    currentPath: '',
    location: '/',
    fetchResourcesRequest: () => {
    },
  };

  describe('Layout container', () => {

    it('render initial', () => {
      const LayoutContainer = shallow(<Layout {...props} key='12732834'/>);

      expect(LayoutContainer.find('li')).toHaveLength(1);
    });
  });
});
