'use strict';

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { render } from '@testing-library/react';
import GraySecondaryButton from '@/components/GraySecondaryButton';

const renderer = () => {
    return render(
      <QueryClientWrapper>
        <GraySecondaryButton buttonLabel='test' handleClick={null} icon={null} />
      </QueryClientWrapper>
    );
};

describe ('Gray Secondary Button component test', () => {
    it ('show that a button can render', () =>{
        const screen = renderer();
        expect(screen.getByText('test'))
    })  
})