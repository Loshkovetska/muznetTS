import Logo from "@/assets/images/splash.png";
import { colors } from "@/tamagui.config";
import { Image, ImageProps } from "tamagui";

export default function CommonImage({
  local = false,
  ...props
}: Omit<ImageProps, "source"> & {
  source?: string | null;
  local?: boolean;
}) {
  return (
    <Image
      borderWidth={1}
      borderColor={colors["light-gray"]}
      {...props}
      source={
        props.source
          ? {
              uri: local
                ? props.source
                : process.env.EXPO_PUBLIC_SUPABASE_STORAGE + "/" + props.source,
            }
          : Logo
      }
    />
  );
}
