import { Text } from "@/components/ui";
import { StarFull } from "@tamagui/lucide-icons";
import { XStack, styled } from "tamagui";

const Container = styled(XStack, {
  variants: {
    variant: {
      list: { position: "absolute", top: 6, right: 8, alignItems: "center" },
      default: {},
    },
  } as const,
  defaultVariants: {
    variant: "default",
  },
});

const RateText = styled(Text, {
  variants: {
    variant: {
      list: {
        marginLeft: 4,
        typo: "reg-14",
      },
      card: {
        marginLeft: 4,
        typo: "reg-17",
      },
      "card-list": {
        marginLeft: 6,
        typo: "medium-20",
      },
      fullscreen: {
        marginLeft: 6,
        typo: "bold-24",
      },
    },
    textColor: {
      default: { color: "black" },
      gray: { color: "slate-gray" },
    },
  } as const,
  defaultVariants: {
    variant: "list",
    textColor: "default",
  },
});

type RateBlockPropType = {
  screenType: "list" | "card" | "card-list" | "fullscreen";
  withTotal?: boolean;
  withTitle?: boolean;
  reviewData: {
    rate: number;
    totalReviews: number;
  };
};

export default function RateBlock({
  screenType,
  reviewData,
  withTotal = true,
  withTitle = false,
}: RateBlockPropType) {
  return (
    <Container
      alignItems="center"
      variant={screenType === "list" ? screenType : "default"}
    >
      <StarFull size={screenType === "list" ? 14 : 16} />
      <RateText variant={screenType}>
        {Number.isInteger(reviewData.rate)
          ? String(reviewData.rate).padEnd(3, ".0")
          : reviewData.rate}
      </RateText>
      {withTotal && (
        <RateText
          variant={screenType}
          textColor={screenType === "fullscreen" ? "default" : "gray"}
        >
          ({reviewData.totalReviews}
          {withTitle
            ? " Review" + (reviewData.totalReviews > 1 ? "s" : "")
            : ""}
          )
        </RateText>
      )}
    </Container>
  );
}
