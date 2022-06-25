/* eslint-disable */
export default {
  displayName: 'ui-components',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/ui/components',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
