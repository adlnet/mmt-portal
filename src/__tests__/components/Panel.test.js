'use strict';

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { fireEvent, render } from '@testing-library/react';
import Panel from '@/components/Panel';

const renderer = () => {
    return render(
      <QueryClientWrapper>
        <Panel title={"Panel Title"} description={"Panel desc"} buttonLabel="Button" image={"test.png"} route={"/"} icon={<>icon</>}>
          <div>Test content</div>
        </Panel>
      </QueryClientWrapper>
    );
};

describe ('Panel component test', () => {
    it ('show that a panel can render', () =>{
        const screen = renderer();
        expect(screen.getByText('Panel Title'));
        expect(screen.getByText('Panel desc'));
        expect(screen.getByText('Test content'));

        fireEvent.click(screen.getByTestId('button'));
        

    })  
})