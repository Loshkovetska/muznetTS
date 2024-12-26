import { IDayObject } from "@/lib/types/date";
import { colors, typography } from "@/tamagui.config";
import React from "react";
import { Stack, Text, YStack, styled } from "tamagui";

const DayContainer = styled(Stack, {
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 6,
  height: 45,
  paddingHorizontal: 9,
  variants: {
    disabled: {
      true: {
        opacity: 0.3,
      },
    },
    isToday: {
      true: {
        borderColor: "#141517",
      },
    },
    isSelected: {
      true: {
        borderColor: "#141517",
        backgroundColor: "#141517",
      },
    },
  },
});

const RangeWrapper = styled(Stack, {
  position: "absolute",
  left: 0,
  right: 0,
  top: 2,
  bottom: 2,
});

const DateText = styled(Text, {
  color: "#141517",
  ...typography["paragraph-17"],
  variants: {
    isSelected: {
      true: {
        color: colors["white"],
      },
    },
    isToday: {
      true: {
        color: colors["white"],
      },
    },
  },
});

interface Props extends Omit<IDayObject, "day"> {
  isToday: boolean;
  isMarked: boolean;
  isSelected: boolean;
  onSelectDate: (date: string) => void;
}

function Day({
  date,
  text,
  disabled,
  isCurrentMonth,
  isToday,
  isSelected,
  inRange,
  leftCrop,
  rightCrop,
  isMarked,
  onSelectDate,
}: Props) {
  const onPress = React.useCallback(() => {
    onSelectDate(date);
  }, [date, onSelectDate]);

  const isCrop = inRange && (leftCrop || rightCrop) && !(leftCrop && rightCrop);
  const rangeRootBackground = colors["black"];

  return (
    <>
      {inRange && !isCrop ? (
        <RangeWrapper backgroundColor={rangeRootBackground} />
      ) : null}

      {isCrop && leftCrop ? (
        <RangeWrapper
          left="50%"
          backgroundColor={rangeRootBackground}
        />
      ) : null}

      {isCrop && rightCrop ? (
        <RangeWrapper
          right="50%"
          backgroundColor={rangeRootBackground}
        />
      ) : null}

      <DayContainer
        disabled={disabled}
        opacity={isCurrentMonth ? undefined : 0.3}
        isToday={isToday && isSelected}
        isSelected={isSelected}
        onPress={disabled ? undefined : onPress}
      >
        <YStack
          alignItems="center"
          justifyContent="center"
          gap={6}
        >
          <DateText
            isSelected={isSelected}
            isToday={isToday && isSelected}
          >
            {text}
          </DateText>
          <Stack
            backgroundColor={isSelected ? "white" : "black"}
            width={6}
            height={6}
            borderRadius={3}
            opacity={isMarked ? 1 : 0}
          />
        </YStack>
      </DayContainer>
    </>
  );
}

const customComparator = (
  prevProps: Readonly<Props>,
  nextProps: Readonly<Props>
) => {
  return (
    prevProps.date === nextProps.date &&
    prevProps.text === nextProps.text &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.isCurrentMonth === nextProps.isCurrentMonth &&
    prevProps.isToday === nextProps.isToday &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.inRange === nextProps.inRange &&
    prevProps.leftCrop === nextProps.leftCrop &&
    prevProps.rightCrop === nextProps.rightCrop &&
    prevProps.onSelectDate === nextProps.onSelectDate
  );
};

export default React.memo(Day, customComparator);
