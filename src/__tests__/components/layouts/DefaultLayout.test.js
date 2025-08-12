'use strict';

import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  useAuthenticatedUser,

//   useMockConfig,
  useUnauthenticatedUser,
} from '@/__mocks__/predefinedMocks';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import mockRouter from 'next-router-mock';

const Wrapper = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

beforeEach(() => {
//   useMockConfig();
});

const renderer = () => {
  mockRouter.setCurrentUrl('/');
  return render(
    <QueryClientWrapper>
      <DefaultLayout>test child</DefaultLayout>
    </QueryClientWrapper>
  );
};

describe('Default Layout', () => {
  it('should show the header & footer component', () => {
    useUnauthenticatedUser();
    renderer();

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Modernized Military Transcript')).toBeInTheDocument();
    expect(screen.getByText('Help Center')).toBeInTheDocument();

  });

  it('should show the child components', () => {
    useAuthenticatedUser();
    renderer();
    expect(screen.getByText('test child')).toBeInTheDocument();
  });
});
