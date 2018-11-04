import React from 'react';
import { shallow } from 'enzyme';
import { NavBar } from './NavBar';

const mockfetchInfoDiskRequest = jest.fn();
const mockfetchResourcesRequest = jest.fn();
const mockclearInfoDisk = jest.fn();
const mockclearResources = jest.fn();
const mockclearToken = jest.fn();
const mockopenModal = jest.fn();

describe('NavBar testing', () => {

// описываем props
  const props = {
    token: '',
    history: {
      location: {
        pathname: '/',
      },
    },
    location: {
      pathname: '/',
    },
    info: {
      display_name: 'Test NavBar',
    },

  };

  describe('NavBar', () => {

    const NavBarContainer = shallow(<NavBar  {...props} />);

    it('snapshot', () => {
      expect(NavBarContainer).toMatchSnapshot();
    });

    describe('NavBar testing functions', () => {

      const nextProps = {
        token: '',
        location: {
          pathname: '/',
          hash: '#access_token=AQAAAAAsVhrAAAU_ByadG6czQUSdgY4RAZ7qiYE&token_type=bearer&expires_in=29850557',

        },
        history:
          {
            location: {
              pathname: '/',
            },
            push: jest.fn(),
          },
        info: {
          display_name: 'Test NavBar',
        },
        fetchInfoDiskRequest: mockfetchInfoDiskRequest,
        fetchResourcesRequest: mockfetchResourcesRequest,
        clearInfoDisk: mockclearInfoDisk,
        clearResources: mockclearResources,
        clearToken: mockclearToken,
        openModal: mockopenModal,
      };

      const NavBarContainer = shallow(<NavBar  {...nextProps} />);

      it('span text', () => {
        expect(NavBarContainer.find('span').text()).toEqual('Test NavBar');
      });

      //проверяем вызов функции mockcreateFolderRequest
      it('function call componentDidMount', () => {
        expect(mockfetchInfoDiskRequest).toHaveBeenCalledTimes(1);
        expect(mockfetchInfoDiskRequest).toHaveBeenCalledTimes(1);
      });

      //проверяем вызов функции mockcloseModal
      it('function signOut', () => {
        NavBarContainer.find('#signOut').simulate('click');
        expect(mockclearResources).toHaveBeenCalled();
        expect(mockclearToken).toHaveBeenCalled();
        expect(mockclearInfoDisk).toHaveBeenCalled();
      });

      it('function create folder', () => {
        NavBarContainer.find('#createFolderBtn').simulate('click');
        expect(mockopenModal).toHaveBeenCalled();
      });
    });
  });
});
