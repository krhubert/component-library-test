import type { Meta, StoryObj } from "@storybook/react";
import Button from "./index";
import React from "react";

const meta: Meta<typeof Button> = {
  title: "cva",
  component: Button,
};
export default meta;

export const Default: StoryObj<typeof Button> = {
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
    <Button
      variant={variant}
      size={size}
      severity={severity}
      disabled={disabled}
      loading={loading}
    >
      This is my button
    </Button>
  ),
};

export const Group: StoryObj<typeof Button.Group> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  component: Button.Group,
  title: "cva",
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
    disabled: false,
  },
  render: ({ variant, size, disabled }) => (
    <Button.Group disabled={disabled} variant={variant} size={size}>
      <Button>Left</Button>
      <Button>Middle</Button>
      <Button>Right</Button>
    </Button.Group>
  ),
};
