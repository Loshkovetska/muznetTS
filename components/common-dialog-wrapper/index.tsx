import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/lib/constants";
import { colors } from "@/tamagui.config";
import { StackProps, YStack } from "tamagui";

export default function CommonDialogWrapper({
  open,
  light = true,
  ...props
}: React.PropsWithChildren & StackProps & { open: boolean; light?: boolean }) {
  return (
    <YStack
      position="absolute"
      width={SCREEN_WIDTH}
      height={SCREEN_HEIGHT}
      top={0}
      left={0}
      backgroundColor={colors[light ? "main" : "black"]}
      opacity={!open ? 0 : 1}
      animateOnly={["opacity"]}
      paddingTop={64}
      gap={16}
      paddingHorizontal={16}
      {...(props as any)}
    />
  );
}
