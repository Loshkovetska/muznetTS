import Logo from "@/assets/images/splash.png";
import { colors } from "@/tamagui.config";
import { Image, ImageProps } from "tamagui";

export default function CommonImage(
  props: Omit<ImageProps, "source"> & { source?: string | null }
) {
  return (
    <Image
      {...props}
      source={props.source ? { uri: props.source } : Logo}
      borderWidth={1}
      borderColor={colors["light-gray"]}
    />
  );
}
