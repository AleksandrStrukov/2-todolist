// import type { StorybookConfig } from "@storybook/react-webpack5";
//
// const config: StorybookConfig = {
//   stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
//   addons: [
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "@storybook/preset-create-react-app",
//     "@storybook/addon-onboarding",
//     "@storybook/addon-interactions",
//   ],
//   framework: {
//     name: "@storybook/react-webpack5",
//     options: {},
//   },
//   docs: {
//     autodocs: "tag",
//   },
//   staticDirs: ["..\\public"],
// };
// export default config;
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)

import {StorybookConfig} from "@storybook/react-webpack5";

const config: StorybookConfig = {
  framework: '@storybook/react',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    // Other Storybook addons
    '@storybook/addon-a11y', //👈 The a11y addon goes here
  ],
};

export default config;