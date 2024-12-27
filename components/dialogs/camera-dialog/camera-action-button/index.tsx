import Button from "@/components/ui/button";
import { colors } from "@/tamagui.config";

type CameraActionButtonPropType = {
  Icon: any;
  borderRadius?: number;
  onPress: () => void;
};

export default function CameraActionButton({
  Icon,
  borderRadius,
  onPress,
}: CameraActionButtonPropType) {
  return (
    <Button
      sizeB="icon-32"
      variant="white/50"
      borderRadius={borderRadius}
      onPress={onPress}
    >
      <Icon
        size={18}
        color={colors["white"]}
      />
    </Button>
  );
}
