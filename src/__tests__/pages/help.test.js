'use strict';

import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import { fireEvent, render } from '@testing-library/react';
import { useAuthenticatedUser, useMockConfig } from '@/__mocks__/predefinedMocks';
import Docs from '@/pages/helpCenter';

const queryClient = new QueryClient();
const renderer = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <Docs />
    </QueryClientProvider>
  );
};

describe('Help Center Page', () => {
  it('should render the page', () => {
    useAuthenticatedUser();
    const { getAllByText } = renderer();
    expect(getAllByText('Help Center').length).toBe(2);

  });

  it('should click the buttons', () => {
    useAuthenticatedUser();
    const { getByText } = renderer();

    fireEvent.click(getByText('Submit a Request'));
    
    // fireEvent.click(getByText('View FAQs'));


  });
});
