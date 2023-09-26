import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import "./button.css";
import twv from "./twv";

export const Variants = ["basic", "accent", "text"] as const;
export type Variant = (typeof Variants)[number];

export const Sizes = ["sm", "md", "lg"] as const;
export type Size = (typeof Sizes)[number];

export const Severities = ["info", "success", "warning", "error"] as const;
export type Severity = (typeof Severities)[number];

const buttonClassName = {
  base: "mx-1 border rounded-md transition-all easy-in duration-200",
  hover: "hover:duration-200 hover:ease-out hover:rounded-2xl",
  active: "active:duration-200 active:ease-out",
  disabled:
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none disable",

  variant: {
    basic: {
      base: "",
      severity: {
        info: "",
        success: "text-green-500",
        warning: "text-yellow-500",
        error: "text-red-500",
      },
    },
    accent: {
      base: ["bg-indigo-500", "text-white"],
      severity: {
        info: "",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-white",
        error: "bg-red-500 text-white",
      },
    },
    text: {
      base: "text-indigo-500 border-indigo-500",
      severity: {
        info: "",
        success: "text-green-500 border-green-200",
        warning: "text-yellow-500 border-yellow-200",
        error: "text-red-500 border-red-200",
      },
    },
  },
  size: {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  },
};

export type ButtonOurProps = {
  variant?: Variant;
  size?: Size;
  severity?: Severity;
  loading?: boolean;
};

export type ButtonProps = PropsWithChildren<
  ButtonOurProps & ButtonHTMLAttributes<HTMLButtonElement>
>;

function Button(props: ButtonProps) {
  const {
    variant = "basic",
    size = "md",
    severity = "info",
    className = "",
  } = props;
  const cm = twMerge(
    buttonClassName.base,
    buttonClassName.hover,
    buttonClassName.active,
    buttonClassName.disabled,
    buttonClassName.variant[variant].base,
    buttonClassName.size[size],
    buttonClassName.variant[variant].severity[severity],
    className
  );

  return (
    <button className={cm} {...props}>
      {props.children}
    </button>
  );
}

export type ButtonGroupProps = {
  children: React.ReactElement<ButtonProps> | React.ReactElement<ButtonProps>[];
  disabled?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
};

function Group(props: ButtonGroupProps) {
  const {
    className = "",
    disabled = false,
    variant = "basic",
    size = "md",
  } = props;
  // Note: this check is not needed for this component to work, but it's
  // here to make sure that we don't use size/variant classes on children
  const children = React.Children.map(props.children, (child) => {
    // TODO: find a better way to check if child has any of variant/size classes
    for (const variant of Variants) {
      if (child.props?.className?.includes(variant)) {
        throw new Error("Button.Group children cannot have variant classes");
      }
    }
    for (const size of Sizes) {
      if (child.props?.className?.includes(size)) {
        throw new Error("Button.Group children cannot have size classes");
      }
    }
    return React.cloneElement(child, { disabled, variant, size });
  });
  return <div className={"btn-group " + className}>{children}</div>;
}

export default Object.assign(Button, { Group });
