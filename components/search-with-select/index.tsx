import SearchOption from "@/components/search-with-select/search-option";
import Input from "@/components/ui/input";
import Separator from "@/components/ui/separator";
import { setValueToForm } from "@/lib/utils";
import { colors } from "@/tamagui.config";
import { Search, X } from "@tamagui/lucide-icons";
import { useCallback, useMemo, useState } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { XStack, YStack } from "tamagui";

type SearchWithSelectPropType = {
  form?: UseFormReturn<any>;
  name: string;
  options: string[];
  placeholder: string;
  edit?: boolean;
  selected?: string[];
  onChange?: (name: string, value: string[]) => void;
};

export default function SearchWithSelect({
  form,
  name,
  options,
  placeholder,
  edit = false,
  selected = [],
  onChange,
}: SearchWithSelectPropType) {
  const [value, setValue] = useState("");
  const selectedItems: string[] = form
    ? useWatch({ control: form?.control, name })
    : selected;

  const searchedOptions = useMemo(() => {
    if (!value.length)
      return options.sort().filter((v) => !selectedItems.includes(v));
    return options
      .sort()
      .filter(
        (option) =>
          option
            .toLocaleLowerCase()
            .slice(0, value.length)
            .includes(value.toLocaleLowerCase()) &&
          !selectedItems.includes(option)
      );
  }, [options, value, selectedItems]);

  const onDelete = useCallback(
    (option: string) => {
      form &&
        setValueToForm(
          form,
          name,
          selectedItems.filter((s) => s !== option)
        );
      onChange?.(
        name,
        selectedItems.filter((s) => s !== option)
      );
    },
    [selectedItems, form, name, onChange]
  );

  const onSelect = useCallback(
    (v: string) => {
      form && setValueToForm(form, name, [...selectedItems, v]);
      onChange?.(name, [...selectedItems, v]);
    },
    [form, name, selectedItems, onChange]
  );
  return (
    <YStack gap={16}>
      <Input
        animate={false}
        variant="search"
        iconLeft={<Search color={colors["dark-gray"]} />}
        iconRight={
          value.length ? (
            <X
              color="black"
              onPress={() => setValue("")}
            />
          ) : undefined
        }
        value={value}
        placeholder={placeholder}
        onChangeText={setValue}
      />
      {selectedItems.length > 0 && (
        <YStack gap={8}>
          <XStack
            flexWrap="wrap"
            gap={8}
          >
            {selectedItems.map((selected) => (
              <SearchOption
                text={selected}
                key={selected + "selected"}
                onDelete={() => onDelete(selected)}
                dark={edit}
              />
            ))}
          </XStack>
          {value.length > 0 && <Separator />}
        </YStack>
      )}

      {(!edit || (edit && value.length > 0)) && searchedOptions.length > 0 && (
        <XStack
          gap={10}
          flexWrap="wrap"
          width="100%"
        >
          {searchedOptions.map((option) => (
            <SearchOption
              text={option}
              key={option}
              onSelect={() => onSelect(option)}
            />
          ))}
        </XStack>
      )}
    </YStack>
  );
}
