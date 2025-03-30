"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { LucideCheck, LucideInfo, LucideX } from "lucide-react";
import React, { useEffect, useState } from "react";

function PasswordSecurityTest({ password }: { password: string }) {
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLength, setHasLength] = useState(false);
  const [percentage, setPercentage] = useState(0);

  //Analyser le mot de passe
  useEffect(() => {
    const lengthRequirement = 8;
    const lengthWeight = Math.min(password.length / lengthRequirement, 1); // Ratio de longueur

    setHasNumber(/\d/.test(password));
    setHasSpecialChar(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password));
    setHasLowerCase(/[a-z]/.test(password));
    setHasUpperCase(/[A-Z]/.test(password));
    setHasLength(password.length >= lengthRequirement);

    // Pondération pour chaque critère
    const weights = {
      hasNumber: 1,
      hasSpecialChar: 1,
      hasLowerCase: 1,
      hasUpperCase: 1,
      lengthWeight: 1, // La longueur a également un poids de 1
    };

    // Calcul du pourcentage basé sur les pondérations
    const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
    const passedWeight =
      (hasNumber ? weights.hasNumber : 0) +
      (hasSpecialChar ? weights.hasSpecialChar : 0) +
      (hasLowerCase ? weights.hasLowerCase : 0) +
      (hasUpperCase ? weights.hasUpperCase : 0) +
      weights.lengthWeight * lengthWeight;

    const percentage = (passedWeight / totalWeight) * 100;
    setPercentage(percentage);
  }, [
    password,
    hasNumber,
    hasSpecialChar,
    hasLowerCase,
    hasUpperCase,
    hasLength,
  ]);

  return (
    <div className="w-full p-4 border bg-muted-foreground/5 dark:bg-muted-foreground/2 rounded-md">
      <div>
        <h2 className="text-sm font-semibold flex items-center gap-1">
          <LucideInfo className="size-3" />
          <span>Recommandation sur la sécurité</span>
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Il est fortement recommandé que votre mot de passe contienne au moins
          8 caractères, une lettre majuscule, une lettre minuscule, un chiffre
          et un caractère spécial.
        </p>
      </div>
      <div className="flex gap-4 my-4">
        <div>
          <div
            className={cn(
              "flex items-center gap-1 text-xs",
              hasNumber ? "text-emerald-500" : "text-red-500/80"
            )}>
            {hasNumber ? (
              <LucideCheck className="size-2" />
            ) : (
              <LucideX className="size-2" />
            )}
            <span>1 nombre</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-1 text-xs",
              hasLowerCase ? "text-emerald-500" : "text-red-500/80"
            )}>
            {hasLowerCase ? (
              <LucideCheck className="size-2" />
            ) : (
              <LucideX className="size-2" />
            )}
            <span>1 minuscule</span>
          </div>
        </div>
        <div>
          <div
            className={cn(
              "flex items-center gap-1 text-xs",
              hasUpperCase ? "text-emerald-500" : "text-red-500/80"
            )}>
            {hasUpperCase ? (
              <LucideCheck className="size-2" />
            ) : (
              <LucideX className="size-2" />
            )}
            <span>1 majuscule</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-1 text-xs",
              hasSpecialChar ? "text-emerald-500" : "text-red-500/80"
            )}>
            {hasSpecialChar ? (
              <LucideCheck className="size-2" />
            ) : (
              <LucideX className="size-2" />
            )}
            <span>1 caractère spécial</span>
          </div>
        </div>
        <div>
          <div
            className={cn(
              "flex items-center gap-1 text-xs",
              hasLength ? "text-emerald-500" : "text-red-500/80"
            )}>
            {hasLength ? (
              <LucideCheck className="size-2" />
            ) : (
              <LucideX className="size-2" />
            )}
            <span>8 caractères</span>
          </div>
        </div>
      </div>
      <Progress
        value={percentage}
        className={cn(
          percentage <= 50
            ? "[&>div]:bg-red-500/80 bg-transparent border border-red-500/80"
            : "",
          percentage > 50
            ? "[&>div]:bg-amber-500/80 bg-transparent border border-amber-500/80"
            : "",
          percentage > 75
            ? "[&>div]:bg-emerald-500/80 bg-transparent border border-emerald-500/80"
            : ""
        )}
      />
    </div>
  );
}

export default PasswordSecurityTest;
