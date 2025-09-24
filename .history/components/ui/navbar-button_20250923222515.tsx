import * as React from "react";
import { cn } from "./utils";

interface NavbarButtonProps extends React.ComponentProps<"button"> {
  scrolled?: boolean;
}

const NavbarButton = React.forwardRef<HTMLButtonElement, NavbarButtonProps>(
  ({ className, scrolled = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-500 transform hover:scale-102 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "border-2 uppercase px-6 py-3 tracking-wider",
          "rounded-none", // Sin bordes redondeados
          "bg-transparent", // Fondo transparente
          scrolled
            ? "border-gray-800 text-black hover:text-gray-800 hover:border-gray-800"
            : "border-white text-white hover:text-amber-500 hover:border-amber-400",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

NavbarButton.displayName = "NavbarButton";

export { NavbarButton };
