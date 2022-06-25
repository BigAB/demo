import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PageLayout } from './PageLayout';

export default {
  component: PageLayout,
  title: 'PageLayout',
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof PageLayout>;

const Template: ComponentStory<typeof PageLayout> = (args) => (
  <PageLayout {...args}>
    <h4>This is where the page content goes</h4>
  </PageLayout>
);

export const Primary = Template.bind({});
Primary.args = {};
