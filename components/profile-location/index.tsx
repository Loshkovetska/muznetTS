import Text from "@/components/ui/text";
import { colors } from "@/tamagui.config";
import { MapPin } from "@tamagui/lucide-icons";
import { XStack, XStackProps } from "tamagui";

export default function ProfileLocation({
  address,
  sizeB = "sm",
  ...props
}: {
  address: string;
  sizeB?: "sm" | "lg";
} & XStackProps) {
  return (
    <XStack
      alignItems="center"
      gap={5}
      {...props}
    >
      <MapPin
        size={sizeB === "sm" ? 14 : 16}
        color={colors["comet"]}
        fill="white"
      />

      <Text
        color="comet"
        typo={sizeB === "sm" ? "reg-14" : "reg-17"}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {address}
      </Text>
    </XStack>
  );
}
