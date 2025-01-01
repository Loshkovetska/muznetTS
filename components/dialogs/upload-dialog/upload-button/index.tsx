import { SCREEN_WIDTH } from "@/lib/constants";
import { colors, typography } from "@/tamagui.config";
import { TouchableOpacity } from "react-native";
import { Text, YStack } from "tamagui";

type UploadButtonPropType = {
  icon: React.ReactNode;
  label: string;
  labelColor?: string;
  onPress: () => void;
};

export default function UploadButton({
  icon,
  label,
  labelColor,
  onPress,
}: UploadButtonPropType) {
  return (
    <TouchableOpacity
      style={{
        width: (SCREEN_WIDTH - 64) / 3,
      }}
      onPress={onPress}
    >
      <YStack
        alignItems="center"
        gap={4}
        width="100%"
        borderWidth={1}
        borderColor={colors["gainsboro"]}
        backgroundColor={colors["white-smoke"]}
        borderRadius={8}
        paddingVertical={8}
        paddingHorizontal={12}
      >
        {icon}
        <Text
          {...typography["bold-16"]}
          color={labelColor}
        >
          {label}
        </Text>
      </YStack>
    </TouchableOpacity>
  );
}
