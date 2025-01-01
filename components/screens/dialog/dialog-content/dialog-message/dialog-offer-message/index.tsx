import { OFFER_BUTTON_STRATEGY } from "@/components/screens/dialog/dialog-content/dialog-message/dialog-offer-message/constants";
import Button from "@/components/ui/button";
import useDeals from "@/lib/hooks/deal.hook";
import useMessages from "@/lib/hooks/messages.hook";
import { UserType } from "@/lib/types";
import { DealType } from "@/lib/types/deal";
import { generateShortDealList } from "@/lib/utils";
import { colors, typography } from "@/tamagui.config";
import { Link } from "expo-router";
import { useMemo } from "react";
import { Text, XStack, YStack, styled } from "tamagui";

const Wrapper = styled(YStack, {
  backgroundColor: colors["main"],
  borderRadius: 12,
  width: "100%",
  padding: 8,
  gap: 8,
});

export default function DialogOfferMessage(
  props: DealType & { from: Partial<UserType> }
) {
  const { from, ...deal } = props;
  const { currentUser: user, refetch } = useMessages({
    enabled: false,
    enabledMessages: false,
  });
  const { updateOfferStatus } = useDeals({
    enabled: false,
    user_id: user?.id || "",
    onSuccess: () => refetch(),
  });
  const data = useMemo(() => generateShortDealList(deal), [deal]);

  const BUTTON_TEXT = OFFER_BUTTON_STRATEGY[deal.offer_status];
  return (
    <YStack
      gap={16}
      width="100%"
    >
      <Wrapper>
        <Text {...typography["medium-15"]}>
          {from.name} {from.surname} is sending you offer, please check it
        </Text>
        <YStack gap={4}>
          {Object.entries(data).map(([key, value]) => (
            <Text
              {...typography["bold-15"]}
              key={key}
            >
              {key}: <Text {...typography["medium-15"]}>{value}</Text>
            </Text>
          ))}
        </YStack>
        {(from.id === user?.id || deal.offer_status !== "waiting") && (
          <Button
            sizeB="sm15"
            variant="secondary"
            height={40}
            borderRadius={6}
            marginTop={2}
            pointerEvents="none"
          >
            {BUTTON_TEXT}
          </Button>
        )}
        {from.id !== user?.id && deal.offer_status === "waiting" && (
          <XStack
            gap={10}
            marginTop={2}
          >
            <Button
              sizeB="sm15"
              variant="dark"
              height={40}
              borderRadius={6}
              flexGrow={1 / 2}
              onPress={() =>
                updateOfferStatus({ deal_id: deal.id, status: "accepted" })
              }
            >
              Accept offer
            </Button>

            <Button
              sizeB="sm15"
              variant="white"
              height={40}
              borderRadius={6}
              flexGrow={1 / 2}
              onPress={() =>
                updateOfferStatus({ deal_id: deal.id, status: "declined" })
              }
            >
              Decline offer
            </Button>
          </XStack>
        )}
      </Wrapper>
      {from.id === user?.id && deal.offer_status !== "waiting" && (
        <Wrapper gap={16}>
          <Text
            {...typography["semi-16"]}
            color={colors["nero"]}
            opacity={0.9}
          >
            To make it easier for you to track and manage your transactions, you
            can go to your profile and see all deals
          </Text>
          <Link
            asChild
            href="/user?tab=deals"
          >
            <Button
              sizeB="sm15"
              variant="dark"
              height={40}
              borderRadius={6}
            >
              My Deals
            </Button>
          </Link>
        </Wrapper>
      )}
    </YStack>
  );
}
