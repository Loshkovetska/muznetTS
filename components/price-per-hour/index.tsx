import { typography } from "@/tamagui.config";
import { Text, XStack, styled } from "tamagui";

const ItemInfoCostValue = styled(Text, {
  variants: {
    sizeB: {
      sm: typography["heading-18"],
      lg: typography["heading-24"],
    },
  },
  defaultVariants: { sizeB: "sm" },
});

const ItemInfoCostValuePostfix = styled(Text, {
  variants: {
    sizeB: {
      sm: typography["paragraph-14"],
      lg: typography["paragraph-17"],
    },
  },
  defaultVariants: { sizeB: "sm" },
});

export default function PricePerHour({
  price,
  sizeB = "sm",
}: {
  price: number;
  sizeB?: "sm" | "lg";
}) {
  return (
    <XStack
      alignItems="center"
      gap={5}
    >
      <ItemInfoCostValue sizeB={sizeB}>${price}</ItemInfoCostValue>
      <ItemInfoCostValuePostfix sizeB={sizeB}>/ hour</ItemInfoCostValuePostfix>
    </XStack>
  );
}
