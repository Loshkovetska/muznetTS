import { colors, typography } from "@/tamagui.config";
import { Text, XStack, styled } from "tamagui";

const TimeWrapper = styled(XStack, {
  position: "absolute",
  top: 16,
  variants: {
    variant: {
      "absolute-center": {
        left: "50%",
        transform: [
          {
            translateX: "-50%",
          },
        ],
        zIndex: 200,
      },
      "absolute-right": {
        right: 16,
        zIndex: 1,
      },
      "absolute-right-bottom": {
        top: "auto",
        right: 4,
        bottom: 4,
        zIndex: 1,
      },
    },
    bgColor: {
      transparent: {
        width: "auto",
      },
      dark: {
        backgroundColor: colors["black-50"],
        borderRadius: 58,
        maxWidth: 100,
        minWidth: 88,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 9,
        paddingVertical: 5.5,
      },
    },
  } as const,
});

const TimeText = styled(Text, {
  variants: {
    sizeB: {
      lg: typography["bold-17"],
      sm: typography["bold-14"],
      "sm-12": typography["medium-12"],
    },
  } as const,
});

type VideoTimePropType = {
  sizeB: "lg" | "sm" | "sm-12";
  variant: "absolute-center" | "absolute-right" | "absolute-right-bottom";
  bg: "transparent" | "dark";
  time: string;
};

export default function VideoTime({
  sizeB,
  variant,
  bg,
  time,
}: VideoTimePropType) {
  return (
    <TimeWrapper
      variant={variant}
      bgColor={bg}
    >
      <TimeText
        sizeB={sizeB}
        color={colors["main"]}
      >
        {time}
      </TimeText>
    </TimeWrapper>
  );
}
