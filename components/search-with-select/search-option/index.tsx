import { colors, typography } from "@/tamagui.config";
import { X } from "@tamagui/lucide-icons";
import { Text, XStack } from "tamagui";

type SearchOptionPropType = {
  text: string;
  onDelete?: () => void;
  onSelect?: () => void;
};

export default function SearchOption({
  text,
  onDelete,
  onSelect,
}: SearchOptionPropType) {
  return (
    <XStack
      borderWidth={1}
      borderRadius={6}
      backgroundColor="white"
      borderColor={colors["gray-20"]}
      height={32}
      paddingLeft={onDelete ? 16 : 9}
      paddingRight={9}
      alignItems="center"
      onPress={onSelect}
      gap={8}
    >
      <Text
        {...typography["label-13"]}
        flexGrow={1}
      >
        {text}
      </Text>
      {onDelete && (
        <X
          size={18}
          onPress={onDelete}
          color={colors["input-cursor"]}
        />
      )}
    </XStack>
  );
}
