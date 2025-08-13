'use strict';

import '@testing-library/jest-dom'
import { AuthContext, AuthProvider, useAuth } from '@/contexts/AuthContext';
import { act } from '@testing-library/react';
import { render, screen } from '@testing-library/react';

// import mockAxios from 'jest-mock-axios';

jest.unmock('@/contexts/AuthContext');
jest.unmock('@/hooks/useStorage');

// mock axios
jest.mock('axios');

// afterEach(() => {
//   // cleaning up the mess left behind the previous test
//   mockAxios.reset();
// });

describe('Auth Context', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
  });

  it('does render', () => {
    const { getByText } = render(
      <AuthProvider>
        <div>
          <p>Hello</p>
        </div>
      </AuthProvider>
    );
    expect(getByText('Hello')).toBeInTheDocument();
  });

  it('user is null', () => {
    const { getByText } = render(
      <AuthProvider>
        <AuthContext>
          {(context) => {
            expect(context).toBeTruthy();
            return <div>{JSON.stringify(context.user)}</div>;
          }}
        </AuthContext>
      </AuthProvider>
    );
    expect(getByText('null')).toBeInTheDocument();
  });

  it('error is null', () => {
    const { getByText } = render(
      <AuthProvider>
        <AuthContext>
          {(context) => {
            expect(context).toBeTruthy();
            return <div>{JSON.stringify(context.error)}</div>;
          }}
        </AuthContext>
      </AuthProvider>
    );
    expect(getByText('null')).toBeInTheDocument();
  });

  it('should register a user', () => {
    const TestComponent = () => {
      const { user, register } = useAuth();
      const testUser = { id: 1, name: 'Test Test'};

      return (
        <div>
          <button onClick={() => register(testUser)}>Register</button>
          <div data-testid="user-data">{JSON.stringify(user)}</div>
        </div>
      );
    };

    const { getByText, getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      getByText('Register').click();
    });

    expect(getByTestId('user-data')).toHaveTextContent('{"id":1,"name":"Test Test"}');
  })

  it('logs in a user', () => {
    const TestComponent = () => {
      const { user, login } = useAuth();
      const testUser = { id: 1, name: 'Test Test'};

      return (
        <div>
          <button onClick={() => login(testUser)}>Login</button>
          <div data-testid="user-data">{JSON.stringify(user)}</div>
        </div>
      );
    };

    const { getByText, getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      getByText('Login').click();
    });

    expect(getByTestId('user-data')).toHaveTextContent('{"id":1,"name":"Test Test"}');
  });


  it('checks if user is logged in', () => {
    const TestComponent = () => {
      const { user, login, checkUserLoggedIn } = useAuth();
      const testUser = { id: 1, name: 'Test Test'};

      return (
        <div>
          <button onClick={() => { login(testUser);}}>Check User</button>
          {/* <button onClick={() => { login(testUser); checkUserLoggedIn(); }}>Check User</button> */}
          <div data-testid="user-data">{JSON.stringify(user)}</div>
        </div>
      );
    };

    const { getByText, getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      getByText('Check User').click();
    });

    expect(getByTestId('user-data')).toHaveTextContent('{"id":1,"name":"Test Test"}');
  });

});
