import React from 'react';
import { file } from './file';


describe('file test', () => {
  const props={
    name:'filename',
    file:''
  };
  it('File name',()=>{

    expect(file(props)).toMatchSnapshot()
  })
});
