import DaySelector from "@/components/ui/date-picker/day-selector";
import Header from "@/components/ui/date-picker/header";
import { HeaderProps } from "@/lib/types/date";
import React, { memo } from "react";
import { YStack } from "tamagui";

interface PropTypes extends HeaderProps {
  height?: number;
}

const Calendar = ({ buttonPrevIcon, buttonNextIcon, height }: PropTypes) => {
  return (
    <YStack width="100%">
      <Header
        buttonPrevIcon={buttonPrevIcon}
        buttonNextIcon={buttonNextIcon}
      />
      <DaySelector />
    </YStack>
  );
};

export default memo(Calendar);
