"use client";

import * as React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import PasswordInput from "@/components/inputs/password-input";
import LocationSearch from "@/components/location-search";
import CheckboxWithLabel from "@/components/ui/checkbox";
import Input, { InputPropType } from "@/components/ui/input";
import SwitchWithLabel from "@/components/ui/switch";
import TextArea from "@/components/ui/textarea";
import { formateDate, formateTime } from "@/lib/utils";
import { colors, typography } from "@/tamagui.config";
import { GetProps, Text, YStack } from "tamagui";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = (props: GetProps<typeof YStack>) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <YStack
        flexDirection="column"
        gap={8}
        {...props}
      />
    </FormItemContext.Provider>
  );
};
FormItem.displayName = "FormItem";

const FormControl = (props: React.PropsWithChildren) => {
  const field = useFormField();

  return () => props.children;
};
FormControl.displayName = "FormControl";

const FormMessage = ({
  className,
  children,
  ...props
}: GetProps<typeof Text>) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <Text
      id={formMessageId}
      color={colors["error"]}
      {...typography["paragraph-12"]}
      {...props}
    >
      {body}
    </Text>
  );
};
FormMessage.displayName = "FormMessage";

type FormElementPropType = {
  type?: "password" | "textarea" | "checkbox" | "location" | "switch";
  inputType?: "date" | "time";
  name: string;
  withIcons?: boolean;
} & InputPropType;

const FormElement = ({ type, ...props }: FormElementPropType) => {
  const InputComp = React.useMemo(
    () =>
      type === "switch"
        ? SwitchWithLabel
        : type === "password"
        ? PasswordInput
        : type === "textarea"
        ? TextArea
        : Input,
    [type]
  );

  const getValue = React.useCallback(
    (value: string) => {
      if (props.inputType) {
        if (props.inputType === "date") return formateDate(value);
        if (props.inputType === "time") return formateTime(value);
      }

      return value;
    },
    [props]
  );
  return (
    <FormField
      name={props.name}
      render={({ field, fieldState }) => (
        <FormItem flexGrow={1}>
          {type === "location" && (
            <LocationSearch
              placeholder={props.placeholder || ""}
              variant={
                (fieldState.error
                  ? "error"
                  : fieldState.isDirty && !fieldState.invalid
                  ? "success"
                  : "default") as "default"
              }
            />
          )}
          {type === "checkbox" && (
            <CheckboxWithLabel
              label={props.placeholder || ""}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
          {type === "switch" && (
            <SwitchWithLabel
              name={props.name}
              label={props.placeholder || ""}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
          {type !== "checkbox" && type !== "location" && type !== "switch" && (
            <InputComp
              variant={
                fieldState.error
                  ? "error"
                  : fieldState.isDirty && !fieldState.invalid
                  ? "success"
                  : undefined
              }
              {...field}
              value={getValue(field.value)}
              onChangeText={field.onChange}
              {...(props as any)}
            />
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export {
  Form,
  FormControl,
  FormElement,
  FormField,
  FormItem,
  FormMessage,
  useFormField,
};
