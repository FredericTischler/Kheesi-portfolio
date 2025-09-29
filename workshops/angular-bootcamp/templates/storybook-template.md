# Storybook Template — Shared Button

```ts
import type { Meta, StoryObj } from '@storybook/angular';
import { SharedButtonComponent, ButtonKind } from '@shared/ui';

const meta: Meta<SharedButtonComponent> = {
  title: 'Shared/Button',
  component: SharedButtonComponent,
  parameters: {
    controls: { expanded: true },
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: true }] } },
  },
  argTypes: {
    kind: {
      control: 'radio',
      options: ['primary', 'ghost', 'destructive'] satisfies ButtonKind[],
    },
  },
};

export default meta;

type Story = StoryObj<SharedButtonComponent>;

export const Controls: Story = {
  args: {
    kind: 'primary',
    disabled: false,
    children: 'Valider',
  },
};

export const A11y: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Les boutons doivent toujours avoir un label textuel clair, un focus visible et un contraste AA minimal.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <shared-button kind="primary">Action principale</shared-button>
      <shared-button kind="ghost">Action secondaire</shared-button>
    `,
  }),
};

export const Docs: Story = {
  parameters: {
    docs: {
      page: () => `
        # Shared Button
        - Utiliser \\`kind=\"primary\"\\` pour les actions majeures.
        - Conserver une largeur minimale de 120px.
        - Toujours remplir la checklist accessibilité avant livraison.
      `,
    },
  },
};
```
