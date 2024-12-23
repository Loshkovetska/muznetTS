import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { colors } from "@/tamagui.config";
import { Search, Settings2, X } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";

type SearchWithFilterPropType = {
  onFilter?: () => void;
};

export default function SearchWithFilter({
  onFilter,
}: SearchWithFilterPropType) {
  const [value, setValue] = useState("");

  const onSubmit = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      if (!onFilter) router.push("/search");
    },
    [onFilter]
  );
  return (
    <Input
      animate={false}
      variant="search-filter"
      sizeB="s40"
      iconLeft={
        <Search
          size={14}
          color={colors["dark-gray"]}
        />
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
              color={colors["white"]}
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
      placeholder="Search"
      onChangeText={setValue}
      onSubmitEditing={onSubmit}
    />
  );
}
