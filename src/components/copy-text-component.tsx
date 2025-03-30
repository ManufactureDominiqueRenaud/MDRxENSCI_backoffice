"use client";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { LucideCheck, LucideCopy } from "lucide-react";
import React from "react";

const CopyToClipboardComponentVariant = cva("transition", {
  variants: {
    size: {
      default: "size-4",
      sm: "size-3",
      xs: "size-2",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface ButtonProps
  extends VariantProps<typeof CopyToClipboardComponentVariant> {
  text: string;
  className?: string;
}

export default function CopyTextComponent({
  className,
  size,
  text,
}: ButtonProps) {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div>
      <LucideCopy
        onClick={() => handleCopyToClipboard(text)}
        className={cn(
          "cursor-pointer",
          CopyToClipboardComponentVariant({ size }),
          isCopied ? "hidden" : "flex",
          className
        )}
      />
      <div
        className={cn(
          "items-center gap-1 text-emerald-500",
          isCopied ? "flex" : "hidden"
        )}>
        Copié !
        <LucideCheck
          className={cn(CopyToClipboardComponentVariant({ size }), className)}
        />
      </div>
    </div>
  );
}
