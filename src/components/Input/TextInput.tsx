import { autofocus } from "@solid-primitives/autofocus";
import clsx from "clsx";
import { Show, splitProps, type Component, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
autofocus;

interface TextInputOwnProps {
  size?: "medium" | "large";
  type?: string;
  isDisabled?: boolean;
  onValueChange?: (value: string) => void;
  value?: unknown;
  error?: boolean;
  helperText?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  transparent?: boolean;
  multiline?: boolean;
}

export type TextInputProps = TextInputOwnProps &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, keyof TextInputOwnProps>;

export const TextInput: Component<TextInputProps> = (_props) => {
  const [props, other] = splitProps(_props, [
    "class",
    "size",
    "type",
    "isDisabled",
    "onValueChange",
    "value",
    "leftIcon",
    "rightIcon",
    "transparent",
    "autofocus",
    "multiline",
  ]);
  const isValid = undefined;
  const onEnterPress = (e: KeyboardEvent) => {
    if (e.code === "Enter" && !e.shiftKey) {
      (e.target as HTMLInputElement).closest("form")?.requestSubmit();
    }
  };

  const inputArea = (
    <Dynamic
      component={props.multiline ? "textarea" : "input"}
      onKeyDown={props.multiline ? onEnterPress : undefined}
      {...other}
      class={clsx("uxa-text-input [field-sizing:content]", props.class, {
        "uxa-disabled": props.isDisabled,
        "uxa-invalid": isValid === false,
        "uxa-large": props.size === "large",
        "!ps-9": "leftIcon" in props,
        "!pe-8": "rightIcon" in props,
        "!bg-transparent": props.transparent,
        "!h-auto": props.multiline,
      })}
      type={props.type}
      disabled={props.isDisabled}
      value={props.value as string}
      onChange={(e: any) => props.onValueChange?.(e.currentTarget.value)}
      autofocus={props.autofocus}
      use:autofocus={props.autofocus}
    />
  );
  return (
    <Show when={"leftIcon" in props || "rightIcon" in props} fallback={inputArea}>
      <div class="relative w-full">
        {inputArea}
        <Show when={"leftIcon" in props}>
          <div class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">{props.leftIcon}</div>
        </Show>
        <Show when={"rightIcon" in props}>
          <div class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">{props.rightIcon}</div>
        </Show>
      </div>
    </Show>
  );
};
