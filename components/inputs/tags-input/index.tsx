import SearchOption from "@/components/search-with-select/search-option";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { setValueToForm } from "@/lib/utils";
import { colors, typography } from "@/tamagui.config";
import { Search } from "@tamagui/lucide-icons";
import { useCallback, useState } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";
import { ScrollView, XStack } from "tamagui";

type TagsInputPropType = {
  form: UseFormReturn<any>;
};
export default function TagsInput({ form }: TagsInputPropType) {
  const tags = useWatch({ control: form.control, name: "tags" });
  const [value, setValue] = useState("");

  const onDelete = useCallback(
    (tag: string) => {
      const tagsNew = tags.filter((tg: string) => tg !== tag);
      setValueToForm(form, "tags", tagsNew);
    },
    [tags, form]
  );

  const onKeyPress = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (nativeEvent.key === " ") {
        setValueToForm(form, "tags", [...(tags || []), value.replace(" ", "")]);

        setTimeout(() => {
          setValue("");
        }, 100);
      }
    },
    [value, tags]
  );

  const onClear = useCallback(() => {
    setValueToForm(form, "tags", []);
  }, [form]);

  return (
    <XStack
      alignItems="center"
      borderBottomWidth={1}
      borderColor={colors["ghost-20"]}
      paddingHorizontal={16}
      gap={6}
    >
      <Search size={20} />
      <Input
        value={value}
        wrapper={{ borderWidth: 0, width: "auto", flexGrow: 1 }}
        onKeyPress={onKeyPress}
        onChangeText={setValue}
      />
      {tags?.length > 0 && (
        <ScrollView
          horizontal
          maxWidth={180}
          flexGrow={1}
          scrollEnabled={tags?.length > 1}
          contentContainerStyle={{ gap: 5, justifyContent: "flex-end" }}
          showsHorizontalScrollIndicator={false}
        >
          {tags.map((tag: string) => (
            <SearchOption
              text={tag}
              key={tag}
              onDelete={() => onDelete(tag)}
            />
          ))}
        </ScrollView>
      )}
      <Button
        variant="transparent"
        textProps={typography["bold-14"]}
        marginLeft={6}
        onPress={onClear}
      >
        Clear
      </Button>
    </XStack>
  );
}
