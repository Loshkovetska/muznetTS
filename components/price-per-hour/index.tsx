import { Text } from "@/components/ui";
import { typography } from "@/tamagui.config";
import { XStack } from "tamagui";

type PricePerHourPropType = {
  price: number;
  typoValue?: keyof typeof typography;
  typoPrefix?: keyof typeof typography;
  hours?: string;
};

export default function PricePerHour({
  price,
  typoValue = "bold-18",
  typoPrefix = "reg-14",
  hours,
}: PricePerHourPropType) {
  return (
    <XStack
      alignItems="center"
      gap={5}
    >
      <Text typo={typoValue}>${price}</Text>
      <Text typo={typoPrefix}>{hours ? hours : "/ hour"}</Text>
    </XStack>
  );
}
