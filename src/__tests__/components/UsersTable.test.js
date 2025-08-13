'use strict';

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { UsersTable } from '@/components/UsersTable';
import { render, screen } from '@testing-library/react';

const renderer = () => {
  return render(
    <QueryClientWrapper>
      <UsersTable />
    </QueryClientWrapper>
  );
};

describe('All Users Table Tests', () => {
    it('Tests that the table renders', () => {
        const screen = renderer()
        expect(screen.findByText('First Name'))
        expect(screen.findByText('Email'))
        expect(screen.findByText('linh.tran@mmt.edu'))
    })
});