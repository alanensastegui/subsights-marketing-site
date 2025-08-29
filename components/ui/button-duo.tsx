import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/cn"
import { Button, buttonVariants } from "@/components/ui/button"

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"]
type ButtonSize = VariantProps<typeof buttonVariants>["size"]

type DataAttributes = Record<`data-${string}`, string>

type DuoActionCommon = {
  label?: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  disabled?: boolean
  ariaLabel?: string
  type?: "button" | "submit" | "reset"
  dataAttributes?: DataAttributes
}

type DuoActionAsChild = DuoActionCommon & {
  asChild: true
  children: React.ReactNode
}

type DuoActionOnClick = DuoActionCommon & {
  asChild?: false
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export type ButtonDuoProps = {
  primary: DuoActionAsChild | DuoActionOnClick
  secondary: DuoActionAsChild | DuoActionOnClick
  className?: string
  /** spacing between buttons */
  gap?: "sm" | "md" | "lg"
  /** breakpoint to switch from column to row */
  stackAt?: "sm" | "md" | "lg"
  /** make buttons full width on mobile */
  fullWidthMobile?: boolean
  classNames?: {
    wrapper?: string
    primary?: string
    secondary?: string
  }
}

const gapClassMap: Record<NonNullable<ButtonDuoProps["gap"]>, string> = {
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
}

const colsAtBreakpointMap: Record<NonNullable<ButtonDuoProps["stackAt"]>, string> = {
  sm: "sm:grid-cols-2",
  md: "md:grid-cols-2",
  lg: "lg:grid-cols-2",
}

export function ButtonDuo({
  primary,
  secondary,
  className,
  gap = "md",
  stackAt = "sm",
  fullWidthMobile = true,
  classNames,
}: ButtonDuoProps) {
  const wrapperClasses = cn(
    "grid grid-cols-1 items-stretch",
    gapClassMap[gap],
    colsAtBreakpointMap[stackAt],
    className,
    classNames?.wrapper
  )

  const buttonBase = cn(fullWidthMobile && "w-full")

  return (
    <div className={wrapperClasses}>
      <DuoButton
        action={primary}
        defaultVariant="default"
        defaultSize="default"
        className={cn(buttonBase, classNames?.primary)}
      />
      <DuoButton
        action={secondary}
        defaultVariant="outline"
        defaultSize="default"
        className={cn(buttonBase, classNames?.secondary)}
      />
    </div>
  )
}

type DuoButtonProps = {
  action: DuoActionAsChild | DuoActionOnClick
  defaultVariant: ButtonVariant
  defaultSize: ButtonSize
  className?: string
}

function DuoButton({ action, defaultVariant, defaultSize, className }: DuoButtonProps) {
  const variant = action.variant ?? defaultVariant
  const size = action.size ?? defaultSize

  if ((action as DuoActionAsChild).asChild) {
    const a = action as DuoActionAsChild
    return (
      <Button
        asChild
        variant={variant}
        size={size}
        disabled={a.disabled}
        aria-label={a.ariaLabel}
        className={cn(className, a.className)}
        {...(a.dataAttributes ?? {})}
      >
        {a.children}
      </Button>
    )
  }

  const a = action as DuoActionOnClick
  if (!a.label) {
    // Guard: avoid rendering an empty button when label is missing.
    return null
  }

  return (
    <Button
      type={a.type ?? "button"}
      onClick={a.onClick}
      variant={variant}
      size={size}
      disabled={a.disabled}
      aria-label={a.ariaLabel}
      className={cn(className, a.className)}
      {...(a.dataAttributes ?? {})}
    >
      {a.label}
    </Button>
  )
}

export default ButtonDuo


