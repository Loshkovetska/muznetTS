import DealsItemContent from "@/components/screens/profile/deals-tab/deals-item-content";
import DealsTabList from "@/components/screens/profile/deals-tab/deals-tab-list";
import DealsTabs from "@/components/screens/profile/deals-tab/deals-tabs";
import useDeals from "@/lib/hooks/deal.hook";
import { UserType } from "@/lib/types";
import { colors } from "@/tamagui.config";
import { useMemo, useState } from "react";
import { YStack } from "tamagui";

type DealsTabPropType = {
  user: UserType | null;
  header: React.ReactNode;
};

export default function DealsTab({ user, header }: DealsTabPropType) {
  const [tab, setTab] = useState<"active" | "closed">("active");
  const [dealId, setDealId] = useState<string | null>(null);
  const { deals } = useDeals({ user_id: user?.id || "" });

  const selectedAd = useMemo(
    () => deals?.find((deal) => deal.id === dealId),
    [dealId, deals]
  );

  return (
    <>
      {!selectedAd ? (
        <YStack
          gap={24}
          flexGrow={1}
          paddingHorizontal={16}
          backgroundColor={colors["white"]}
        >
          {header}
          <DealsTabs
            tab={tab}
            setTab={setTab}
          />
          <DealsTabList
            deals={deals || []}
            tab={tab}
            onDealChange={setDealId}
          />
        </YStack>
      ) : (
        <DealsItemContent
          {...selectedAd}
          user_id={user?.id}
          onClose={() => setDealId(null)}
        />
      )}
    </>
  );
}
