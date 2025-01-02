import AddReviewDialog from "@/components/dialogs/add-review-dialog";
import RateBlock from "@/components/rate-block";
import ReviewItem from "@/components/screens/details/reviews-list/review-item";
import { Button, Separator } from "@/components/ui";
import { QUERY_TAGS, SCREEN_WIDTH } from "@/lib/constants";
import { ReviewService } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList } from "react-native";
import { Stack, XStack, YStack } from "tamagui";

type ReviewsListPropType = {
  type?: "full" | "carousel";
  ad_id?: string;
  profile_id?: string;
  rate: {
    totalReviews: number;
    rate: number;
  };
  onOpen?: () => void;
};

export default function ReviewsList({
  type = "carousel",
  rate,
  ad_id,
  profile_id,
  onOpen,
}: ReviewsListPropType) {
  const [isOpen, setOpen] = useState(false);
  const { data: reviews = [] } = useQuery({
    queryKey: [QUERY_TAGS.REVIEWS],
    queryFn: () => ReviewService.getReviews({ profile_id, ad_id }),
    enabled: !!rate.totalReviews,
  });

  return (
    <>
      {type === "carousel" && <Separator />}
      <YStack
        gap={16}
        width="100%"
      >
        <XStack justifyContent="space-between">
          <RateBlock
            reviewData={rate}
            withTitle={type === "full"}
            screenType={type === "carousel" ? "card-list" : "fullscreen"}
          />
          {type === "carousel" && (
            <Button
              sizeB="sm"
              variant="dark"
              width={100}
              onPress={() => setOpen(true)}
            >
              Add review
            </Button>
          )}
        </XStack>
        {!!reviews.length && (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={reviews}
            horizontal={type === "carousel"}
            pagingEnabled
            scrollEnabled={reviews.length > 1}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              gap: type === "carousel" ? 8 : 24,
              paddingBottom: type === "carousel" ? undefined : 250,
            }}
            renderItem={({ item, index }) => (
              <Stack
                key={item.id}
                width={
                  type === "full"
                    ? "100%"
                    : reviews?.length > 1
                    ? SCREEN_WIDTH - 64
                    : SCREEN_WIDTH - 32
                }
                height={type === "carousel" ? "100%" : undefined}
                gap={24}
              >
                {type === "full" && !!index && <Separator />}
                <ReviewItem
                  type={type === "carousel" ? "small" : "full"}
                  {...item}
                />
              </Stack>
            )}
          />
        )}
        {type === "carousel" && !!reviews.length && (
          <Button
            variant="white"
            sizeB="lg"
            onPress={onOpen}
          >
            See more
          </Button>
        )}
      </YStack>
      <AddReviewDialog
        open={isOpen}
        ad_id={ad_id}
        profile_id={profile_id}
        rate={rate}
        onOpenChange={() => setOpen(false)}
      />
    </>
  );
}
