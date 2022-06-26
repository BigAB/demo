import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pagination } from './Pagination';

export default {
  component: Pagination,
  title: 'Pagination',
  parameters: {
    layout: 'centered',
  },
  argTypes: { onChange: { action: 'onChange' } },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  page: 1,
  totalPages: 10,
};
