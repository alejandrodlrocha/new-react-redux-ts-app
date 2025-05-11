// Home.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';
import * as hooks from '../store/hooks';
import * as selectors from '../store/selectors';
import * as userActions from '../store/slices/users/actions';
import { increment } from '../store/slices/counter/actions';

// Optional: mock image
jest.mock('../assets/img/create-react-redux-ts-app.png', () => 'logo.png');

// Mock hooks
jest.mock('../store/hooks', () => ({
  ...jest.requireActual('../store/hooks'),
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock fetchUser action
jest.mock('../store/slices/users/actions', () => ({
  ...jest.requireActual('../store/slices/users/actions'),
  fetchUser: jest.fn(),
}));

describe('Home Component with Saga Actions', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (hooks.useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('dispatches increment and saga fetchUser on button click', () => {
    (hooks.useAppSelector as jest.Mock).mockImplementation((selector: any) => {
      if (selector === selectors.selectCounterValue) return 0;
      if (selector === selectors.selectUserData) return { id: 0 };
      if (selector === selectors.selectUserLoading) return false;
    });

    const mockedFetchUser = userActions.fetchUser as jest.Mock;
    mockedFetchUser.mockImplementation((id) => ({ type: 'users/FETCH_USER', payload: id }));

    render(<Home />);
    const button = screen.getByRole('button', { name: /Test users sample API Call and redux counter/i });

    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(increment());
    expect(mockedFetchUser).toHaveBeenCalledWith(expect.any(Number));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'users/FETCH_USER', payload: expect.any(Number) });
  });

  it('displays user data when available', () => {
    const mockUser = {
      id: 1,
      name: 'Jane Doe',
      username: 'janed',
      email: 'jane@example.com',
      phone: '123-456',
      website: 'example.com',
      address: {
        street: '123 Main',
        suite: 'Apt. 1',
        city: 'Townsville',
        zipcode: '12345',
        geo: { lat: '12.34', lng: '56.78' },
      },
      company: {
        name: 'Example Inc',
        catchPhrase: 'We deliver',
        bs: 'business stuff',
      },
    };


    (hooks.useAppSelector as jest.Mock).mockImplementation((selectorFn: any) => {
      if (selectorFn === selectors.selectCounterValue) return 1;
      if (selectorFn === selectors.selectUserData) return mockUser;
      if (selectorFn === selectors.selectUserLoading) return false;
    });

    render(<Home />);

    expect(screen.getByText(/Jane Doe/)).toBeInTheDocument();
    expect(screen.getByText(/123 Main/)).toBeInTheDocument();
    expect(screen.getByText(/Example Inc/)).toBeInTheDocument();
  });
});
