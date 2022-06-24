import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PageLayout } from './PageLayout';

export default {
  component: PageLayout,
  title: 'PageLayout',
} as ComponentMeta<typeof PageLayout>;

const Template: ComponentStory<typeof PageLayout> = (args) => (
  <PageLayout {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
