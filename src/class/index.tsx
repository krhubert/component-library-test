/* 
NOTE: this is almost the same as global approach
the only difference is that we are using btn class
instead of button css selector

TODO: fix the storybook
*/
import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import "./button.css";

export const Variants = ["basic", "accent", "text"] as const;
export type Variant = (typeof Variants)[number];

export const Sizes = ["sm", "md", "lg"] as const;
export type Size = (typeof Sizes)[number];

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

export type ButtonGroupProps = {
  children: React.ReactElement<ButtonProps> | React.ReactElement<ButtonProps>[];
  disabled?: boolean;
  className?: string;
};

function Button(props: ButtonProps) {
  const { className = "", ...rest } = props;
  return (
    <button className={"btn " + className} {...rest}>
      {props.children}
    </button>
  );
}

function Group(props: ButtonGroupProps) {
  const { className = "", disabled = false } = props;
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
    return React.cloneElement(child, { className, disabled });
  });
  return <div className="btn-group">{children}</div>;
}

export default Object.assign(Button, { Group });
