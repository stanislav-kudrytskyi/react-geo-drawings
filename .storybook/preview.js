import { withGlobals } from "@luigiminardim/storybook-addon-globals-controls";

export const globalTypes = {
  uncontrolled: {
    name: "Uncontrolled",
    description: "Should not have any controls.",
  },
  text: {
    name: "mapProviderApiKey",
    description: 'Map provider API KEY',
    control: { type: 'text', placeholder: 'key' },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const withDisplayGlobals = withGlobals((Story, globalValues) => (
    <div>
      {JSON.stringify(globalValues, null, 2)}
      <Story />
    </div>
));

export const decorators = [withDisplayGlobals];