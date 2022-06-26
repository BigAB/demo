import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchForm } from './SearchForm';

export default {
  component: SearchForm,
  title: 'SearchForm',
  parameters: {
    layout: 'centered',
  },
  argTypes: { onSearch: { action: 'onSearch' } },
} as ComponentMeta<typeof SearchForm>;

const Template: ComponentStory<typeof SearchForm> = (args) => (
  <SearchForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
