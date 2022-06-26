import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PaginatedList } from './PaginatedList';
import { MultiNameMediaBlock } from '../MultiNameMediaBlock';

type MNMBProps = React.ComponentProps<typeof MultiNameMediaBlock> & {
  id: number;
};

export default {
  component: PaginatedList,
  title: 'PaginatedList',
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof PaginatedList>;

const Template: ComponentStory<typeof PaginatedList<MNMBProps>> = (args) => (
  <PaginatedList<MNMBProps> {...args} />
);

export const Primary = Template.bind({});

interface HasName {
  name: string;
}

Primary.args = {
  items: [
    {
      id: 1,
      link: '/BigAB',
      imageSrc: 'https://avatars.githubusercontent.com/u/76821?s=40&amp;v=4',
      imageAlt: '@BigAB',
      name: 'Adam L Barrett',
      secondaryName: 'BigAB',
      desc: 'JavaScript and Front-End Consultant / Developer',
      tags: ['SK, Canada', ['bigab@live.ca', 'mailto:bigab@live.ca']],
    },
    {
      id: 2,
      name: 'Jane Doe',
      imageSrc: 'https://avatars.githubusercontent.com/u/12821714?v=4',
      tags: [['dope af', 'https://dope.af']],
    },
  ],
  pagination: {
    page: 1,
    totalPages: 10,
    onChange: (page: number) => console.log(page),
  },
  renderItem: (item: HasName) => <MultiNameMediaBlock {...item} />,
};
