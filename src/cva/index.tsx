import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import "./button.css";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  " mx-1 border rounded-md transition-all easy-in duration-200" +
    " hover:duration-200 hover:ease-out hover:rounded-2xl" +
    " active:duration-200 active:ease-out" +
    " disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        basic: "",
        accent: "bg-indigo-500 text-white",
        text: "text-indigo-500 border-indigo-500",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
      },
      // NOTE: this is a noop but it's still needed to create compound variants
      severity: {
        info: "",
        success: "",
        warning: "",
        error: "",
      },
    },

    /* NOTE: there is no type check for variants */
    // compoundVariants looks good for bigger matrix of classes
    // doing this in plain css with selectors would require
    // a lot of effort and extra classes
    compoundVariants: [
      // basic severities
      {
        variant: "basic",
        severity: "success",
        className: "text-green-500",
      },
      {
        variant: "basic",
        severity: "warning",
        className: "text-yellow-500",
      },
      {
        variant: "basic",
        severity: "error",
        className: "text-red-500",
      },

      // accent severities
      {
        variant: "accent",
        severity: "success",
        className: "bg-green-500 text-white",
      },
      {
        variant: "accent",
        severity: "warning",
        className: "bg-yellow-500 text-white",
      },
      {
        variant: "accent",
        severity: "error",
        className: "bg-red-500 text-white",
      },

      // text severities
      {
        variant: "text",
        severity: "success",
        className: "text-green-500 border-green-200",
      },
      {
        variant: "text",
        severity: "warning",
        className: "text-yellow-500 border-yellow-200",
      },
      {
        variant: "text",
        severity: "error",
        className: "text-red-500 border-red-200",
      },
    ],

    /* NOTE: there is no type check for variants */
    defaultVariants: {
      variant: "basic",
      size: "md",
      severity: "info",
    },
  }
);

export type ButtonProps = PropsWithChildren<
  VariantProps<typeof buttonVariants> &
    ButtonHTMLAttributes<HTMLButtonElement> & {
      loading?: boolean;
      className?: string;
    }
>;

function Button(props: ButtonProps) {
  const {
    variant = "basic",
    size = "md",
    severity = "info",
    className = "",
  } = props;
  // NOTE: twMerge is needed
  // 1. to merge the classNames from the variants
  //    suppose mx-1 is set as a base class, and you want to
  //    change it to mx-0.5 for small variant, you can't do it
  //    without tailwind-merge, so you need to use twMerge
  //
  // 2. to merge the classNames from the user
  //    they should take precedence over the variants
  const cm = twMerge(buttonVariants({ variant, size, severity }), className);
  return (
    <button className={cm} {...props}>
      {props.children}
    </button>
  );
}

export type ButtonGroupProps = {
  children: React.ReactElement<ButtonProps> | React.ReactElement<ButtonProps>[];
  disabled?: boolean;
  variant?: "basic" | "accent" | "text";
  size?: "sm" | "md" | "lg";
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
    for (const variant of ["basic", "accent", "text"]) {
      if (child.props?.className?.includes(variant)) {
        throw new Error("Button.Group children cannot have variant classes");
      }
    }
    for (const size of ["sm", "md", "lg"]) {
      if (child.props?.className?.includes(size)) {
        throw new Error("Button.Group children cannot have size classes");
      }
    }
    return React.cloneElement(child, { disabled, variant, size });
  });
  return <div className={"btn-group " + className}>{children}</div>;
}

export default Object.assign(Button, { Group });
