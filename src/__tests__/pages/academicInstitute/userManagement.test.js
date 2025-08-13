'use strict';

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import {
  createSaveSearchMockFn,
  useAuthenticatedUser,
  useMockCreateSaveSearch,
  useUnauthenticatedUser,
} from '@/__mocks__/predefinedMocks';
import { fireEvent, render } from '@testing-library/react';
import UserManagement from '@/pages/academicInstitute/userManagement';

const renderer = () => {
  return render(
    <QueryClientWrapper>
      <UserManagement />
    </QueryClientWrapper>
  );
};

afterEach(() => {
  jest.resetAllMocks();
});

describe('UserManagement', () => {
  it('should render the UserManagement page', () => {
      useAuthenticatedUser();
      const { getByText, getByPlaceholderText } = renderer();
      
      fireEvent.click(getByText('Search'));

      expect(getByText('Search')).toBeInTheDocument();
      fireEvent.change(getByPlaceholderText('Search'), {
        target: { value: 'John' },
      });

      //fireEvent.click(getByText('Search'));

      fireEvent.click(getByText('Add New User'));

      expect(getByPlaceholderText('First Name')).toBeInTheDocument();
      fireEvent.change(getByPlaceholderText('First Name'), {
        target: { value: 'John' },
      });
      fireEvent.change(getByPlaceholderText('Last Name'), {
        target: { value: 'Doe' },
      });
      fireEvent.change(getByPlaceholderText("Email"), {
        target: { value: 'test@test.com' },
      });
      fireEvent.change(getByPlaceholderText('Role'), {
        target: { value: 'Test Role' },
      });

      fireEvent.click(getByText('Add User'))
      
  });
});