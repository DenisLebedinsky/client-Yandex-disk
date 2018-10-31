import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from './layout';


describe('Layout container', () => {
  const props = { // описываем props
    token: '',
    data: { item: [{}, {}] },
    currentPath: '',
    location: '/',
  };


  describe('Layout container', () => {
    it('render initial', () => {
      const nextProps = {
        ...props,
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
      };
      const LayoutContainer = shallow(<layout {...nextProps} />);

      expect(LayoutContainer.find('li'))
        //.toHaveLength(0);
      //console.log(LayoutContainer);
    });
  });
});
