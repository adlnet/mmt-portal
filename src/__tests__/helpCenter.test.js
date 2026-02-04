'use strict';

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { fireEvent, render } from '@testing-library/react';
import HelpCenter from '@/pages/academicInstitute/helpCenter';

global.window.open = jest.fn();

const renderer = () => {
  return render(
    <QueryClientWrapper>
      <HelpCenter />
    </QueryClientWrapper>
  );
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('Help Center Page', () => {

  it('should display support request description', () => {
    const { getByText } = renderer();
    
    expect(getByText('If you need help resolving an issue or have a specific request, submitting a support ticket is the best way to get direct, personalized assistance. Our support team will review your ticket, track the issue, and respond as quickly as possible.')).toBeInTheDocument();
  });

  it('should open support request link when button is clicked', () => {
    const { getByTestId } = renderer();
    
    const submitButton = getByTestId('request');
    fireEvent.click(submitButton);
    
    expect(window.open).toHaveBeenCalledWith(
      'https://dantes.zendesk.com/hc/en-us/requests/new',
      'DantesZendesk',
      'noopener'
    );
  });

  it('should render submit request button with external link icon', () => {
    const { getByText } = renderer();
    
    const submitButton = getByText('Submit a Request');
    expect(submitButton).toBeInTheDocument();
    
    const buttonElement = submitButton.closest('button');
    const svgIcon = buttonElement.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });

});
