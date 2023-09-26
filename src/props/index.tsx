import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import "./button.css";

export const Variants = ["basic", "accent", "text"] as const;
export type Variant = (typeof Variants)[number];

export const Sizes = ["sm", "md", "lg"] as const;
export type Size = (typeof Sizes)[number];

export const Severities = ["info", "success", "warning", "error"] as const;
export type Severity = (typeof Severities)[number];

const buttonClassName = {
  base:
    " mx-1 border rounded-md transition-all easy-in duration-200" +
    " hover:duration-200 hover:ease-out hover:rounded-2xl" +
    " active:duration-200 active:ease-out" +
    " disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none disable",

  variant: {
    basic: "",
    accent: ["bg-indigo-500", "text-white"], // just to demonstrate you can use arrays out of the box
    text: "text-indigo-500 border-indigo-500",
  },
  size: {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  },
  severity: {
    basic: {
      info: "",
      success: "text-green-500",
      warning: "text-yellow-500",
      error: "text-red-500",
    },
    accent: {
      info: "",
      success: "bg-green-500 text-white",
      warning: "bg-yellow-500 text-white",
      error: "bg-red-500 text-white",
    },
    text: {
      info: "",
      success: "text-green-500 border-green-200",
      warning: "text-yellow-500 border-yellow-200",
      error: "text-red-500 border-red-200",
    },
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
  // NOTE: twMerge is needed here
  // 1. to merge the classNames from the variants
  //    suppose mx-1 is set as a base class, and you want to
  //    change it to mx-0.5 for small variant, you can't do it
  //    without tailwind-merge, so you need to use twMerge
  //
  // 2. to merge the classNames from the user
  //    they should take precedence over the variants
  const cm = twMerge(
    buttonClassName.base,
    buttonClassName.variant[variant],
    buttonClassName.size[size],
    buttonClassName.severity[variant][severity],
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
