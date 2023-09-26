import type { Meta, StoryObj } from "@storybook/react";
import Button, { ButtonGroupProps } from "./index";

type ButtonWithArgs = React.ComponentProps<typeof Button> & {
  variant: "basic" | "accent" | "text";
  size: "sm" | "md" | "lg";
  severity: "info" | "success" | "warning" | "error";
  disabled: boolean;
  loading: boolean;
};

const meta: Meta<ButtonWithArgs> = {
  title: "cssclass",
  component: Button,
};
export default meta;

export const Default: StoryObj<ButtonWithArgs> = {
  argTypes: {
    variant: {
      options: ["basic", "accent", "text"],
      control: { type: "radio" },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    severity: {
      options: ["info", "success", "warning", "error"],
      control: { type: "radio" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
  },
  args: {
    variant: "basic",
    size: "md",
    severity: "info",
    disabled: false,
    loading: false,
  },

  render: ({ variant, size, severity, disabled, loading }) => (
    /*
     * there is no type check on classes for variants/sizes/severity
     * not sure if this is something that we should worry about because
     * tailwind has exact same issue
     *
     * what's good about it is that it's easy to extend classes like hover
     * add to class name and it will just work
     *    hover:text-2xl
     *
     * NOTE: this component can be just replaced with button html element
     */
    <Button
      disabled={disabled}
      className={`${variant} ${size} ${severity} ${loading ? "loading" : ""}`}
    >
      This is my button
    </Button>
  ),
};

type ButtonGroupWithArgs = ButtonGroupProps & {
  variant: "basic" | "accent" | "text";
  size: "sm" | "md" | "lg";
};

export const Group: StoryObj<ButtonGroupWithArgs> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  component: Button.Group,
  title: "cssclass",
  argTypes: {
    variant: {
      options: ["basic", "accent", "text"],
      control: { type: "radio" },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
  args: {
    variant: "basic",
    size: "md",
  },
  render: ({ variant, size, disabled }) => (
    <Button.Group disabled={disabled} className={`${variant} ${size}`}>
      <Button>Left</Button>
      <Button>Middle</Button>
      <Button>Right</Button>
    </Button.Group>
  ),
};
