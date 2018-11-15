import React from 'react';
import { shallow } from 'enzyme';
import { MSG } from './Msg';

const props = {
  msg: {
    show: true,
    status: 'create folder',
  },
};

describe('msg testing', () => {
  const Msg = shallow(<MSG  {...props} />);

  it('snapshot', () => {
    //u   console.log(ModalContainer.debug());
    expect(Msg).toMatchSnapshot();
  });

  it('msg text', () => {
    expect(Msg.find('div').text()).toEqual('create folder');
  });

});
