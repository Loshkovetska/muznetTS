import { colors, typography } from "@/tamagui.config";
import { MapPin } from "@tamagui/lucide-icons";
import { Text, XStack, styled } from "tamagui";

const ItemInfoLocation = styled(XStack, {
  alignItems: "center",
  paddingRight: 75,
  gap: 5,
});

const ItemInfoLocationText = styled(Text, {
  color: colors["s-black"],
  ...typography["paragraph-14"],

  variants: {
    sizeB: {
      sm: typography["paragraph-14"],
      lg: typography["paragraph-17"],
    },
  },
});

export default function ProfileLocation({
  address,
  sizeB = "sm",
}: {
  address: string;
  sizeB?: "sm" | "lg";
}) {
  return (
    <ItemInfoLocation>
      <MapPin
        size={sizeB === "sm" ? 14 : 16}
        color={colors["s-black"]}
        fill="white"
      />

      <ItemInfoLocationText
        sizeB={sizeB}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {address}
      </ItemInfoLocationText>
    </ItemInfoLocation>
  );
}
