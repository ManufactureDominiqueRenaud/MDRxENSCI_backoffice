"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ModeToggleInDropdown() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 p-1 bg-foreground/5 rounded-lg relative">
        <Button
          variant="ghost"
          size="iconXs"
          className="z-20 relative"
          onClick={() => {
            setTheme("light");
          }}>
          <Sun />
        </Button>
        <Button
          variant="ghost"
          size="iconXs"
          className="z-20 relative"
          onClick={() => {
            setTheme("dark");
          }}>
          <Moon />
        </Button>
        <div
          className={cn(
            buttonVariants({ size: "iconXs" }),
            theme === "light" && "left-0",
            theme === "dark" && "right-0",
            "block bg-foreground/10 hover:bg-foreground/10 shadow-none transition-all absolute z-10 m-1"
          )}></div>
      </div>
      <p className="text-xs capitalize">Mode : {theme}</p>
    </div>
  );
}
