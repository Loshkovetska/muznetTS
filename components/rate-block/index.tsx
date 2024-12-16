import RateStarIcon from "@/assets/images/icon/rate_star_icon.svg";
import { ReviewType } from "@/lib/types";
import { rateAverageCount } from "@/lib/utils";
import { colors, typography } from "@/tamagui.config";
import { useMemo } from "react";
import { Text, XStack, styled } from "tamagui";

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
        ...typography["paragraph-14"],
      },
      card: {
        marginLeft: 4,
        ...typography["paragraph-17"],
      },
      "card-list": {
        marginLeft: 6,
        ...typography["label-20"],
      },
      fullscreen: {
        marginLeft: 6,
        ...typography["heading-24"],
      },
    },
    textColor: {
      default: { color: colors["black"] },
      gray: { color: colors["cyan-gray"] },
    },
  } as const,
  defaultVariants: {
    variant: "list",
    textColor: "default",
  },
});

type RateBlockPropType = {
  screenType: "list" | "card" | "card-list" | "fullscreen";
  reviewData: ReviewType[];
};

export default function RateBlock({
  screenType,
  reviewData,
}: RateBlockPropType) {
  console.log("heee");
  const rateAverage = useMemo(() => rateAverageCount(reviewData), [reviewData]);
  return (
    <Container variant={screenType === "list" ? screenType : "default"}>
      <RateStarIcon
        width={screenType === "list" ? 10 : 20}
        height={screenType === "list" ? 9 : 19}
      />
      <RateText variant={screenType}>{rateAverage}</RateText>
      <RateText
        variant={screenType}
        textColor="gray"
      >
        ({reviewData.length})
      </RateText>
    </Container>
  );
}
