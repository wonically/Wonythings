import { FC, useState, useEffect } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@heroui/switch";
import clsx from "clsx";
import { useTheme } from "@heroui/use-theme";
import { motion } from "framer-motion";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light",
    onChange: () => setTheme(theme === "light" ? "dark" : "light"),
  });

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  // Prevent Hydration Mismatch
  if (!isMounted) return <div className="w-6 h-6" />;

  return (
    <Component
      aria-label={isSelected ? "Switch to dark mode" : "Switch to light mode"}
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        })}
      >
        {isSelected ? (
          <motion.div
            key="moon"
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 15, scale: 0.8 }}
            initial={{ rotate: -15, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.6,
            }}
            whileHover={{
              rotate: 15,
              scale: 1.1,
              filter: "brightness(1.2)",
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            <MoonFilledIcon className="text-[#4A90E2]" size={22} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 15, scale: 0.8 }}
            initial={{ rotate: -15, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.6,
            }}
            whileHover={{
              rotate: 15,
              scale: 1.1,
              filter: "brightness(1.2)",
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            <SunFilledIcon className="text-[#FFD700]" size={22} />
          </motion.div>
        )}
      </div>
    </Component>
  );
};
