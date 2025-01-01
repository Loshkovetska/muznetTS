import { colors, typography } from "@/tamagui.config";
import { X } from "@tamagui/lucide-icons";
import { Stack, Text, XStack } from "tamagui";

type SearchOptionPropType = {
  text: string;
  dark?: boolean;
  onDelete?: () => void;
  onSelect?: () => void;
};

export default function SearchOption({
  text,
  dark,
  onDelete,
  onSelect,
}: SearchOptionPropType) {
  return (
    <XStack
      borderWidth={1}
      borderRadius={18}
      backgroundColor={colors["black"]}
      borderColor={colors["gray-20"]}
      height={34}
      paddingLeft={onDelete ? 16 : 9}
      paddingRight={9}
      alignItems="center"
      onPress={onSelect}
      gap={8}
    >
      <Text
        {...typography["medium-13"]}
        flexGrow={1}
        color={colors["main"]}
      >
        {text}
      </Text>
      {onDelete && (
        <Stack
          onPress={onDelete}
          width={16}
          height={16}
          alignItems="center"
          justifyContent="center"
          backgroundColor={colors["main-20"]}
          borderRadius={8}
        >
          <X
            size={12}
            color={colors["ghost"]}
          />
        </Stack>
      )}
    </XStack>
  );
}
