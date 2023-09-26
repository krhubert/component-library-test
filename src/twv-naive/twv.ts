import { twMerge } from "tailwind-merge";

export type TwClassName = {
  base: string | string[];
  hover?: string | string[];
  focus?: string | string[];
  active?: string | string[];
  disabled?: string | string[];
};

export type ClassName = string | string[] | TwClassName;

function prefixfy(className: string | string[] | undefined, prefix: string) {
  if (className === undefined) {
    return "";
  } else if (typeof className === "string") {
    return className
      .split(/\s+/)
      .map((cn) => prefix + cn)
      .join(" ");
  } else {
    return className.map((cn) => prefix + cn);
  }
}

export default function twv(...classNames: ClassName[]) {
  return twMerge(
    classNames.map((className) => {
      if (typeof className === "string") {
        return className;
      } else if (Array.isArray(className)) {
        return className;
      } else {
        return [
          className.base,
          prefixfy(className.hover, "hover:"),
          prefixfy(className.focus, "focus:"),
          prefixfy(className.active, "active:"),
          prefixfy(className.disabled, "disabled:"),
        ];
      }
    })
  );
}
