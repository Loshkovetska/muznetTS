import { SCREEN_WIDTH } from "@/lib/constants";
import { typography } from "@/tamagui.config";
import { TouchableOpacity } from "react-native";
import { Text, YStack } from "tamagui";

type UploadButtonPropType = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
};

export default function UploadButton({
  icon,
  label,
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
        borderColor="#E0E0E0"
        backgroundColor="#F5F5F5"
        borderRadius={8}
        paddingVertical={8}
        paddingHorizontal={12}
      >
        {icon}
        <Text {...typography["heading-16"]}>{label}</Text>
      </YStack>
    </TouchableOpacity>
  );
}
