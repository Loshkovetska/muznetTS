import { colors } from "@/tamagui.config";
import { XStack, XStackProps } from "tamagui";

export default function ProfileBottomBar(
  props: React.PropsWithChildren & XStackProps
) {
  return (
    <XStack
      width="100%"
      zIndex={200_000}
      position="absolute"
      bottom={0}
      left={0}
      paddingHorizontal={16}
      paddingTop={8}
      paddingBottom={24}
      backgroundColor={colors["white"]}
      borderWidth={1}
      borderColor={colors["light-gray"]}
      {...props}
    />
  );
}
