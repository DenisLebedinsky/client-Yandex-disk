import React from 'react';
import { ListItem } from './ListItem';
import { shallow } from 'enzyme';

describe('List item test', () => {
  const props = {
    item: {
      name: 'filename',
      file: '',
    },
  };

  const ListItemComponent = shallow(<ListItem  {...props} />);

  it('snapshot', () => {
    expect(ListItemComponent).toMatchSnapshot();
  });
});
