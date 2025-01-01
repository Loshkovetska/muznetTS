import BottomBar from "@/components/bottom-bar";
import CommonHeader from "@/components/common-header";
import DealsItemInfo from "@/components/screens/profile/deals-tab/deals-item-content/deals-item-info";
import Button from "@/components/ui/button";
import Separator from "@/components/ui/separator";
import Text from "@/components/ui/text";
import useDeals from "@/lib/hooks/deal.hook";
import { DealType } from "@/lib/types/deal";
import { colors } from "@/tamagui.config";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { useState } from "react";
import { ScrollView, XStack, YStack } from "tamagui";

export default function DealsItemContent(
  deal: DealType & { onClose: () => void; user_id?: string }
) {
  const [isOpen, setOpen] = useState(false);
  const { updateStatus, isUpdateStatusPending } = useDeals({
    enabled: false,
    user_id: deal.user_id || "",
  });

  return (
    <>
      <YStack
        gap={16}
        paddingHorizontal={16}
        backgroundColor={colors["main"]}
      >
        <CommonHeader
          title={`Deal № ${deal.deal_num}`}
          onBack={deal.onClose}
        />
        <Text
          typo="bold-24"
          textAlign="center"
        >
          {deal.ad.title}
        </Text>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 40,
            gap: 16,
            paddingBottom: 260,
          }}
          showsVerticalScrollIndicator={false}
        >
          <DealsItemInfo
            {...deal.ad}
            status={deal.status}
          />
          <Separator />
          <XStack
            width="100%"
            justifyContent="space-between"
            onPress={() => setOpen((prev) => !prev)}
          >
            <Text
              typo="medium-16"
              color="nero"
            >
              More details
            </Text>
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </XStack>
          <Separator />
          {isOpen && <Text typo="medium-16">{deal.ad.description}</Text>}
        </ScrollView>
      </YStack>
      <BottomBar>
        <Button
          sizeB="lg"
          variant="dark"
          width="100%"
          disabled={deal.status === "closed"}
          loading={isUpdateStatusPending}
          onPress={() => updateStatus(deal.id)}
        >
          Close the deal
        </Button>
      </BottomBar>
    </>
  );
}
