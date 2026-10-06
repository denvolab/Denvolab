import NextLink from "next/link";
import { Children, cloneElement, isValidElement, type AnchorHTMLAttributes, type ComponentProps, type ReactNode } from "react";
import { ButtonText } from "../button/button-text";

/** Keep each link's markup, icons and routing while animating its text labels. */
function animatedLabel(children: ReactNode): ReactNode {
  return Children.map(children, child => {
    if (typeof child === "string" && child.trim()) {
      return <ButtonText text={child} wrap />;
    }
    if (isValidElement<{ children?: ReactNode }>(child) && typeof child.type === "string" && child.props.children) {
      return cloneElement(child, {}, animatedLabel(child.props.children));
    }
    return child;
  });
}

export default function AnimatedLink({ children, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink {...props}>{animatedLabel(children)}</NextLink>;
}

export function AnimatedAnchor({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props}>{animatedLabel(children)}</a>;
}
