import { Button, Input } from "@/components/ui";
import { colors } from "@/tamagui.config";
import { Search, Settings2, X } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import { StackProps } from "tamagui";

type SearchWithFilterPropType = {
  q?: string;
  iconLeft?: React.ReactNode;
  placeholder?: string;
  onFilter?: () => void;
} & StackProps;

export default function SearchWithFilter({
  q,
  iconLeft,
  placeholder,
  onFilter,
  ...rest
}: SearchWithFilterPropType) {
  const [value, setValue] = useState("");

  const onSubmit = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      if (!onFilter) return router.push(`/search?q=${value}`);
      router.setParams({ q: value });
    },
    [value, onFilter]
  );

  useEffect(() => {
    setValue(q || "");
  }, [q]);

  return (
    <Input
      wrapper={rest as any}
      animate={false}
      variant="search-filter"
      sizeB="s40"
      iconLeft={
        iconLeft || (
          <Search
            size={14}
            color={colors["dark-gray"]}
          />
        )
      }
      iconRight={
        onFilter ? (
          <Button
            variant="dark"
            width={28}
            height={28}
            onPress={onFilter}
          >
            <Settings2
              color={colors["main"]}
              size={18}
            />
          </Button>
        ) : value.length ? (
          <X
            color="black"
            size={18}
            onPress={() => setValue("")}
          />
        ) : undefined
      }
      value={value}
      placeholder={placeholder || "Search"}
      onChangeText={setValue}
      onSubmitEditing={onSubmit}
    />
  );
}
