import CommonImage from "@/components/common-image";
import RateBlock from "@/components/rate-block";
import { ReviewType } from "@/lib/types";
import { getReviewDate } from "@/lib/utils";
import { colors, typography } from "@/tamagui.config";
import { Text, XStack, YStack, styled } from "tamagui";

const Container = styled(YStack, {
  gap: 16,
  variants: {
    variant: {
      small: {
        borderWidth: 1,
        borderColor: colors["light-gray"],
        padding: 16,
        backgroundColor: colors["main"],
        borderRadius: 12,
        flexGrow: 1,
      },
      full: {},
    },
  } as const,
});

type ReviewItemPropType = {
  type: "small" | "full";
} & ReviewType;

export default function ReviewItem({ type, ...review }: ReviewItemPropType) {
  return (
    <Container variant={type}>
      <YStack
        width="100%"
        gap={type === "small" ? 16 : 8}
      >
        <XStack
          alignItems="center"
          justifyContent="space-between"
        >
          <XStack gap={type === "small" ? 8 : 12}>
            <CommonImage
              source={review.user?.photo?.[0]}
              width={type === "small" ? 40 : 48}
              height={type === "small" ? 40 : 48}
              resizeMode="cover"
              borderRadius={5}
            />
            <YStack gap={2}>
              <Text {...typography["bold-17"]}>
                {review.user.name} {review.user.surname}
              </Text>
              <Text
                {...typography["reg-13"]}
                color={colors["dim-gray"]}
              >
                {getReviewDate(review.created_at)}
              </Text>
            </YStack>
          </XStack>
          {type === "full" && (
            <RateBlock
              withTotal={false}
              screenType="list"
              reviewData={{
                rate: review.rate,
                totalReviews: 0,
              }}
            />
          )}
        </XStack>
        <Text
          numberOfLines={type === "small" ? 5 : undefined}
          {...typography["reg-15"]}
        >
          {review.text}
        </Text>
      </YStack>
      {type === "full" && !!review.response && (
        <YStack gap={8}>
          <Text {...typography["medium-17"]}>Response from {"Leo"}:</Text>
          <Text {...typography["reg-15"]}>{review.response}</Text>
        </YStack>
      )}
    </Container>
  );
}
