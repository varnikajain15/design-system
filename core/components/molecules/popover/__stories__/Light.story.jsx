import * as React from 'react';
import { Button, Popover } from '@/index';

// CSF format story
export const lightPopover = () => (
  <div className="mb-9">
    <Popover position="bottom" on="click" trigger={<Button appearance="basic">Open Popover</Button>} open={false}>
      <div style={{ width: 'var(--spacing-7)', height: 'var(--spacing-7)' }} />
    </Popover>
  </div>
);

export default {
  title: 'Components/Popover/Light Popover',
  component: Popover,
  parameters: {
    docs: {
      docPage: {
        noHtml: true,
      },
    },
  },
};
