import Text from "@/components/ui/text";
import { SCREEN_WIDTH } from "@/lib/constants";
import { colors } from "@/tamagui.config";
import { TouchableOpacity } from "react-native";
import { YStack } from "tamagui";

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
          typo="bold-16"
          color={labelColor as "error"}
        >
          {label}
        </Text>
      </YStack>
    </TouchableOpacity>
  );
}
