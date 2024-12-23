import { colors, typography } from "@/tamagui.config";
import { MapPin } from "@tamagui/lucide-icons";
import { GetProps, Text, XStack, styled } from "tamagui";

const ItemInfoLocation = styled(XStack, {
  alignItems: "center",
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
  ...props
}: {
  address: string;
  sizeB?: "sm" | "lg";
} & GetProps<typeof ItemInfoLocation>) {
  return (
    <ItemInfoLocation {...props}>
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
