import DaySelector from "@/components/ui/date-picker/day-selector";
import Header from "@/components/ui/date-picker/header";
import { colors } from "@/tamagui.config";
import React, { memo } from "react";
import { YStack } from "tamagui";

type CalendarPropType = {
  subBlock?: boolean;
  resize?: boolean;
};

const Calendar = ({ subBlock, resize = false }: CalendarPropType) => {
  return (
    <YStack
      width="100%"
      borderColor={colors["default-gray"]}
      borderRadius={6}
      borderWidth={1}
      borderTopWidth={subBlock ? 0 : 1}
      paddingBottom={16}
    >
      <Header />
      <DaySelector resize={resize} />
    </YStack>
  );
};

export default memo(Calendar);
