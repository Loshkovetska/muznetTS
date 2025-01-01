import { typography } from "@/tamagui.config";
import { Text, XStack, styled } from "tamagui";

const ItemInfoCostValue = styled(Text, {
  variants: {
    sizeB: {
      sm: typography["bold-18"],
      lg: typography["bold-24"],
      "sm-16": typography["bold-16"],
    },
  },
  defaultVariants: { sizeB: "sm" },
});

const ItemInfoCostValuePostfix = styled(Text, {
  variants: {
    sizeB: {
      sm: typography["reg-14"],
      "sm-16": typography["reg-14"],
      lg: typography["reg-17"],
    },
  },
  defaultVariants: { sizeB: "sm" },
});

export default function PricePerHour({
  price,
  sizeB = "sm",
  hours,
}: {
  price: number;
  sizeB?: "sm" | "lg" | "sm-16";
  hours?: string;
}) {
  return (
    <XStack
      alignItems="center"
      gap={5}
    >
      <ItemInfoCostValue sizeB={sizeB}>${price}</ItemInfoCostValue>
      <ItemInfoCostValuePostfix sizeB={sizeB}>
        {hours ? hours : "/ hour"}
      </ItemInfoCostValuePostfix>
    </XStack>
  );
}
