import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from './Modal';


const mockCreateFolderRequest = jest.fn();
const mokecloseModal = jest.fn();


describe('Modal testing', () => {
// описываем props
  const props = {
    modal: {
      isOpen: false,
    },
    createFolder: mockCreateFolderRequest,
    closeModal: mokecloseModal,
  };

  describe('Modal visible none', () => {

    const ModalContainer = shallow(<Modal  {...props} />);

    it('snapshot', () => {
      //u   console.log(ModalContainer.debug());
      expect(ModalContainer).toMatchSnapshot();
    });


    describe('Modal visible', () => {

      const nextProps = {
        modal: {
          isOpen: true,
        },
      };
      const ModalContainer = shallow(<Modal  {...nextProps} />);

      it('snapshot', () => {
        console.log(ModalContainer.debug());
        expect(ModalContainer).toMatchSnapshot();
      });

      //проверяем вызов функции mockcreateFolderRequest
      it('function create folder', () => {
        console.log(ModalContainer.find('#CreateFolder').debug());
        ModalContainer.find('#CreateFolder').simulate('click');
        expect(mockCreateFolderRequest).toHaveBeenCalledTimes(1);
      });

      //проверяем вызов функции mockcloseModal
      it('function close modal', () => {
        ModalContainer.find('#closeModal').simulate('click');
        expect(mokecloseModal).toHaveBeenCalledTimes(1);
      });
    });
  });
});
