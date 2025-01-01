import { getPeriod } from "@/lib/utils";
import { colors, typography } from "@/tamagui.config";
import { Clock } from "@tamagui/lucide-icons";
import { useMemo } from "react";
import { Text, XStack } from "tamagui";

type DetailsPeriodPropType = {
  start_date: string;
  end_date: string;
  noMargin?: boolean;
};

export default function DetailsPeriod({
  start_date,
  end_date,
  noMargin,
}: DetailsPeriodPropType) {
  const period = useMemo(
    () => getPeriod(start_date, end_date),
    [start_date, end_date]
  );
  return (
    <XStack
      gap={5}
      marginTop={noMargin ? 0 : 8}
      alignItems="center"
    >
      <Clock
        color={colors["comet"]}
        size={16}
      />
      <Text
        {...typography["reg-17"]}
        color={colors["comet"]}
      >
        {period}
      </Text>
    </XStack>
  );
}
