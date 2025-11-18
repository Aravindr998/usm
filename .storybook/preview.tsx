import type { Preview } from '@storybook/nextjs'
import "../app/globals.css"
import { create, themes } from 'storybook/theming';
import { Bitcount_Grid_Single } from "next/font/google";


const bitcountGridSingle = Bitcount_Grid_Single({
  variable: "--font-bitcount-single",
  subsets: ["latin"],
  fallback: ['Arial', 'sans-serif'],
})

const customDarkTheme = create({
  base: "dark",
  appBg: "#0a0a0a",
  appContentBg: "#0a0a0a",
  textColor: "#ededed"
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    docs: {
      theme: customDarkTheme
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  decorators: [
    (Story) => (
      <div className={`${bitcountGridSingle.variable} antialiased font-bitcount`}>
        <Story />
      </div>
    )
  ]
};

export default preview;