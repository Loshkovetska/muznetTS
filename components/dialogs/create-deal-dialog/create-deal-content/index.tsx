import BottomBar from "@/components/bottom-bar";
import DealsItemInfo from "@/components/screens/profile/deals-tab/deals-item-content/deals-item-info";
import Button from "@/components/ui/button";
import { MobileSheet } from "@/components/ui/mobile-sheet";
import Select, { SelectContent } from "@/components/ui/select";
import useAds from "@/lib/hooks/ads.hook";
import { typography } from "@/tamagui.config";
import dayjs from "dayjs";
import { useMemo } from "react";
import { Text, YStack } from "tamagui";

type CreateDealContentPropType = {
  open: boolean;
  user_id: string;
  loading: boolean;
  adsId?: string;
  onOpenChange: () => void;
  onValueChange: (name: string, value: string) => void;
  onSubmit: () => void;
};

export default function CreateDealContent({
  open,
  user_id,
  loading,
  adsId,
  onOpenChange,
  onValueChange,
  onSubmit,
}: CreateDealContentPropType) {
  const { ads } = useAds({ user_id });

  const adsTitles = useMemo(
    () =>
      ads?.map((c) => ({
        id: c.id,
        title: c.title,
      })) || [],
    [ads]
  );

  const selectedAd = useMemo(
    () => ads?.find((a) => a.id === adsId),
    [ads, adsId]
  );

  return (
    <MobileSheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <YStack
        width="100%"
        minHeight={300}
        paddingBottom={100}
        gap={24}
      >
        <Text
          {...typography["bold-20"]}
          textAlign="center"
        >
          Create Offer
        </Text>
        <Select
          name="ad_title"
          value={selectedAd?.title || ""}
          placeholder="Select ad"
          options={adsTitles}
        />
        {selectedAd && (
          <YStack gap={8}>
            <DealsItemInfo {...selectedAd} />
          </YStack>
        )}
      </YStack>
      <BottomBar
        paddingBottom={0}
        paddingHorizontal={0}
      >
        <Button
          variant="dark"
          sizeB="lg"
          disabled={!adsId || dayjs(selectedAd?.start_date).isBefore(dayjs())}
          loading={loading}
          onPress={onSubmit}
        >
          Confirm
        </Button>
      </BottomBar>
      <SelectContent onValueChange={onValueChange} />
    </MobileSheet>
  );
}
