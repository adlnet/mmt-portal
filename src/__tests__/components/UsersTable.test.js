'use strict';

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { UsersTable } from '@/components/UsersTable';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const mockUserData = [
  {
    email: 'test1@example.com',
    first_name: 'Test',
    last_name: 'User1',
    position: 'Tester'
  },
  {
    email: 'test2@example.com',
    first_name: 'Test2',
    last_name: 'User2',
    position: 'Developer'
  },
  {
    email: 'test3@example.com',
    first_name: 'Test3',
    last_name: 'User3',
    position: 'Manager'
  }
];

const mockProps = {
  data: mockUserData,
  onDeleteUser: jest.fn(),
  currentPage: 1,
  setCurrentPage: jest.fn()
}

const renderer = () => {
  return render(
    <QueryClientWrapper>
      <UsersTable {...mockProps} />
    </QueryClientWrapper>
  );
};

describe('All Users Table Tests', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Tests that the table renders', async () => {
      renderer();
      expect(await screen.findByText('First Name')).toBeTruthy();
      expect(await screen.findByText('Email')).toBeTruthy();
      expect(await screen.findByText('Last Name')).toBeTruthy();
      expect(await screen.findByText('Role')).toBeTruthy();
    })

    it('Tests that user data is rendered in the table', async () => {
      renderer();
      expect(await screen.findByText('Test')).toBeTruthy();
      expect(await screen.findByText('User1')).toBeTruthy();
      expect(await screen.findByText('Tester')).toBeTruthy();
      expect(await screen.findByText('test1@example.com')).toBeTruthy();
    });

    it('handles checkbox selection', async () => {
      renderer();

      await waitFor(() => {
        expect(screen.getByText('Test')).toBeInTheDocument();
      });

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(3);

      fireEvent.click(checkboxes[0]);
      expect(checkboxes[0]).toBeChecked();

      const deleteButton = screen.getByRole('button', { name: /delete/i });
      expect(deleteButton).not.toBeDisabled();
    });

    it('handles empty data array', () => {
      render(
        <QueryClientWrapper>
          <UsersTable {...mockProps} data={[]} />
        </QueryClientWrapper>
      );
      
      expect(screen.getByText('First Name')).toBeInTheDocument();
      expect(screen.queryByText('Test')).not.toBeInTheDocument();
    });

    it('calls onDeleteUser when delete button is clicked', async () => {
      const mockOnDeleteUser = jest.fn();
      
      render(
        <QueryClientWrapper>
          <UsersTable {...mockProps} onDeleteUser={mockOnDeleteUser} />
        </QueryClientWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Test')).toBeInTheDocument();
      });

      const checkboxes = screen.getAllByRole('checkbox');
      const deleteButton = screen.getByRole('button', { name: /delete/i });

      fireEvent.click(checkboxes[0]);
      
      fireEvent.click(deleteButton);

      expect(mockOnDeleteUser).toHaveBeenCalledWith(mockUserData[0]);
    });

  it('filters out specific user when multiple are selected', async () => {
    renderer();

    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    const checkboxes = screen.getAllByRole('checkbox');
    
    fireEvent.click(checkboxes[0]); 
    fireEvent.click(checkboxes[1]);
    fireEvent.click(checkboxes[2]);
    
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).toBeChecked();
    
    fireEvent.click(checkboxes[1]);
    expect(checkboxes[1]).not.toBeChecked();
    
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[2]).toBeChecked();
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).not.toBeDisabled();
});
});
