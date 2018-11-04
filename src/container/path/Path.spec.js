import React from 'react';
import { shallow } from 'enzyme';
import { Path } from './Path';

describe('Path testing', () => {

// описываем props
  const props = {
    token: '',
    pathEl: 'folder1',
    currentPath: ['/', 'folder1'],
  };

  describe('Path', () => {

    const PathContainer = shallow(<Path  {...props} />);

    it('snapshot', () => {
      expect(PathContainer).toMatchSnapshot();
     });

    it('button text', () => {
      expect(PathContainer.find('.btnPath').text()).toEqual('folder1');
    });

  });
})
;
