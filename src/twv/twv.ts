// tailwind variants

import { twMerge } from "tailwind-merge";

export type TwClassName = {
  base: string | string[];
  hover?: string | string[];
  focus?: string | string[];
  active?: string | string[];
  disabled?: string | string[];
  // headless-ui - checked?: string | string[],
};

export type ClassName = string | string[] | TwClassName;

export type RecursiveKeyObject = {
  [key: string]: ClassName | TwClassName | RecursiveKeyObject;
};

export type ComponentClassName =
  | ClassName
  | {
      [key: string]: RecursiveKeyObject;
    };

// examples

// plain string
export const buttonClassNameString: ComponentClassName = "text-white";

// array of strings
export const buttonClassNameArray: ComponentClassName = ["text-white"];

// object with base
export const buttonClassNameObject: ComponentClassName = {
  base: "text-white",
  hover: "text-black",
  disabled: "text-gray-500",
};

// object with variants
export const buttonClassNameObjectVariants: ComponentClassName = {
  base: "text-white",
  hover: "text-black",
  disabled: "text-gray-500",

  variant: {
    primary: "text-white",
    secondary: "text-black",
  },
};

// object with variants and objects
export const buttonClassNameObjectVariantsObject: ComponentClassName = {
  base: "text-white",
  hover: "text-black",
  disabled: "text-gray-500",

  variant: {
    primary: {
      base: "text-white",
      hover: "text-black",
      disabled: "text-gray-500",
    },
    secondary: ["text-black"],
  },
};

// object with nested variants and objects
export const buttonClassNameObjectNestedVariants: ComponentClassName = {
  base: "text-white",
  hover: "text-black",
  disabled: "text-gray-500",

  variant: {
    primary: {
      base: "text-white",
      hover: "text-black",
      disabled: "text-gray-500",
    },
    secondary: ["text-black"],
  },

  severity: {
    primary: {
      info: "text-white",
      success: ["text-black"],
      warning: "text-gray-500",
      error: { base: "text-red-500", hover: ["text-red-600"] },
    },
    secondary: {
      info: "bg-white",
      success: ["bg-black"],
      warning: "bg-gray-500",
      error: { base: "bg-red-500", hover: ["bg-red-600"] },
    },
  },
};

export const buttonClassNameObjectNestedVariants1: ComponentClassName = {
  base: "text-white",
  hover: "text-black",
  disabled: "text-gray-500",

  variant: {
    primary: {
      base: "text-white",
      hover: "text-black",
      disabled: "text-gray-500",

      severity: {
        info: "text-white",
        success: ["text-black"],
        warning: "text-gray-500",
        error: { base: "text-red-500", hover: ["text-red-600"] },
      },
    },
    secondary: {
      base: ["text-black"],

      severity: {
        info: "bg-white",
        success: ["bg-black"],
        warning: "bg-gray-500",
        error: { base: "bg-red-500", hover: ["bg-red-600"] },
      },
    },
  },
};
export const buttonClassNameObjectNestedVariants2: ComponentClassName = {
  base: "text-white",
  hover: "text-black",
  disabled: "text-gray-500",

  variant: {
    primary: {
      base: "text-white",
      hover: "text-black",
      disabled: "text-gray-500",

      severity: {
        info: "text-white",
        success: ["text-black"],
        warning: "text-gray-500",
        error: { base: "text-red-500", hover: ["text-red-600"] },
      },
    },
    secondary: {
      base: ["text-black"],
    },
  },
};

// this should return props as
/*
  type TwvButtonProps = {
    variant: "primary" 
    severity: "info" | "success" | "warning" | "error",
  } | {
    variant: "secondary"
  }
*/

// todo:
// export function twv(comp: ComponentClassName) {
//     return (props: infer from ComponentClassName, className?: string) => {
//         return twMerge(/*...*/)
//     }
// }

/* usage: 
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

<button className={twv({ variant, size, severity }, className)}>btn</button>

or just pass props, but here default variant should be defined in the twv definition

<button className={twv(props)}>btn</button>
*/

// twv returns a class name builder function that returns a string
// it returns react props type based on the config
export default function twv(config: ComponentClassName) {
  return (props) => {
    const classNames: string[] = [];
    const addClassNames = (classNamesToAdd: ComponentClassName | ClassName) => {
      if (classNamesToAdd) {
        if (typeof classNamesToAdd === "string") {
          classNames.push(classNamesToAdd);
        } else if (Array.isArray(classNamesToAdd)) {
          classNames.push(...classNamesToAdd);
        } else if (typeof classNamesToAdd === "object") {
          if (classNamesToAdd.base) {
            addClassNames(classNamesToAdd.base);
          }

          if (classNamesToAdd.hover) {
            const hoverClassNames = Array.isArray(classNamesToAdd.hover)
              ? classNamesToAdd.hover
              : [classNamesToAdd.hover.split(/\s+/)];
            hoverClassNames.forEach((className) => {
              classNames.push(`hover:${className}`);
            });
          }

          if (classNamesToAdd.focus) {
            const focusClassNames = Array.isArray(classNamesToAdd.focus)
              ? classNamesToAdd.focus
              : [classNamesToAdd.focus.split(/\s+/)];
            focusClassNames.forEach((className) => {
              classNames.push(`focus:${className}`);
            });
          }

          if (classNamesToAdd.active) {
            const activeClassNames = Array.isArray(classNamesToAdd.active)
              ? classNamesToAdd.active
              : [classNamesToAdd.active.split(/\s+/)];
            activeClassNames.forEach((className) => {
              classNames.push(`active:${className}`);
            });
          }

          if (classNamesToAdd.disabled) {
            const disabledClassNames = Array.isArray(classNamesToAdd.disabled)
              ? classNamesToAdd.disabled
              : [classNamesToAdd.disabled.split(/\s+/)];
            disabledClassNames.forEach((className) => {
              classNames.push(`disabled:${className}`);
            });
          }

          for (const key in classNamesToAdd) {
            if (Object.prototype.hasOwnProperty.call(classNamesToAdd, key)) {
              const classNameConfig = classNamesToAdd[key];
              if (props[key]) {
                addClassNames(classNameConfig);
              }
            }
          }
        }
      }
    };

    addClassNames(config);
    return twMerge(classNames);
  };
}
