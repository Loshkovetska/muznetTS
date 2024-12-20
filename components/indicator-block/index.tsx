import { colors } from "@/tamagui.config";
import { Stack, XStack, styled } from "tamagui";

const StyledIndicatorBlock = styled(XStack, {
  marginTop: 16,
  marginBottom: 20,
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  variants: {
    absolute: {
      true: {
        position: "absolute",
        left: "50%",
        transform: [{ translateX: "-50%" }],
        bottom: 14,
      },
    },
  } as const,
});

const IndicatorThumb = styled(Stack, {
  height: 6,
  width: 20,
  borderRadius: 3,
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 10,
});

const IndicatorItem = styled(Stack, {
  height: 6,
  width: 6,
  borderRadius: 3,
});

type IndicatorBlockPropType = {
  list: any[];
  variant?: "light" | "dark";
  currentIndex: number;
  absolute?: boolean;
};

export default function IndicatorBlock({
  list,
  variant = "dark",
  currentIndex = 0,
  absolute,
}: IndicatorBlockPropType) {
  return (
    <StyledIndicatorBlock absolute={absolute}>
      <IndicatorThumb
        left={currentIndex * 14}
        backgroundColor={colors[variant === "light" ? "white" : "black"]}
      />
      {[...list, null].map((key) => (
        <IndicatorItem
          key={key}
          backgroundColor={
            variant === "dark" ? colors["gray"] : "rgba(254,254,254,0.7)"
          }
        />
      ))}
    </StyledIndicatorBlock>
  );
}
