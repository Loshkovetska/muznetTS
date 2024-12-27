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
    },
    bgColor: {
      transparent: {
        width: "auto",
      },
      dark: {
        backgroundColor: "rgba(0,0,0,0.5)",
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
      lg: typography["heading-17"],
      sm: typography["heading-14"],
    },
  } as const,
});

type VideoTimePropType = {
  sizeB: "lg" | "sm";
  variant: "absolute-center" | "absolute-right";
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
        color={colors["white"]}
      >
        {time}
      </TimeText>
    </TimeWrapper>
  );
}
