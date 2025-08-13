'use strict';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ExclamationToast from '@/components/ExclamationToast';

describe('ExclamationToast', () => {
  it('should render and display the toast with the provided message', () => {
    render(<ExclamationToast message="Test Message" />);
    expect(screen.getByText('Test Message')).toBeInTheDocument
  });
});