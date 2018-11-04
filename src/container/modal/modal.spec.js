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
  };

  describe('Modal visible none', () => {

    const ModalContainer = shallow(<Modal  {...props} />);

    it('snapshot', () => {
      expect(ModalContainer).toMatchSnapshot();
    });

    describe('Modal visible', () => {

      const nextProps = {
        modal: {
          isOpen: true,
        },
        closeModal: mokecloseModal,
        createFolderRequest: mockCreateFolderRequest,
      };
      const ModalContainer = shallow(<Modal  {...nextProps} />);

      it('snapshot', () => {
        expect(ModalContainer).toMatchSnapshot();
      });

      //проверяем вызов функции mockcreateFolderRequest
      it('function create folder', () => {
        ModalContainer.setState({ enterText: 'newfolder' });
        ModalContainer.find('#CreateFolder').simulate('click');
        expect(mockCreateFolderRequest).toHaveBeenCalledTimes(1);
      });

      //проверяем вызов функции mockcloseModal
      it('function close modal', () => {
        ModalContainer.find('#closeModal').simulate('click');
        expect(mokecloseModal).toHaveBeenCalled();
      });
    });
  });
});
