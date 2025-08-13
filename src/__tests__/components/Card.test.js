'use strict';

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { fireEvent, render } from '@testing-library/react';
import Card from '@/components/Card';

const renderer = () => {
    return render(
      <QueryClientWrapper>
        <Card title={"Card Title"} description={"Card desc"} buttonLabel="Button" image={"test.png"} route={"/"}>
          <div>Test content</div>
        </Card>
      </QueryClientWrapper>
    );
};

describe ('Card component test', () => {
    it ('show that a card can render', () =>{
        const screen = renderer();
        expect(screen.getByText('Card Title'));
        expect(screen.getByText('Card desc'));
        expect(screen.getByText('Button'));
        expect(screen.getByText('Test content'));

        fireEvent.click(screen.getByText('Button'));
        

    })  
})