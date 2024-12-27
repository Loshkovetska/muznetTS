import CameraActionButton from "@/components/dialogs/camera-dialog/camera-action-button";
import { X } from "@tamagui/lucide-icons";
import { XStack } from "tamagui";

type CameraFuncPropType = {
  FacingIcon: any;
  visible?: boolean;
  onOpenChange: () => void;
  onFacing: () => void;
} & React.PropsWithChildren;

export default function CameraFunc({
  FacingIcon,
  children,
  visible = true,
  onOpenChange,
  onFacing,
}: CameraFuncPropType) {
  return (
    <XStack
      marginTop={40}
      alignItems="center"
      justifyContent="space-between"
      display={visible ? "flex" : "none"}
    >
      <CameraActionButton
        Icon={X}
        borderRadius={16}
        onPress={onOpenChange}
      />
      {children}
      <CameraActionButton
        Icon={FacingIcon}
        borderRadius={16}
        onPress={onFacing}
      />
    </XStack>
  );
}
