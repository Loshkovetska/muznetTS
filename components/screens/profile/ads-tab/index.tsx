import AddEditAdDialog from "@/components/dialogs/add-edit-ad-dialog";
import AdsTabItem from "@/components/screens/profile/ads-tab/ads-tab-item";
import { Button } from "@/components/ui";
import { useAds } from "@/lib/hooks";
import { UserType } from "@/lib/types";
import { colors } from "@/tamagui.config";
import { useCallback, useMemo, useState } from "react";
import { FlatList } from "react-native";
import { YStack } from "tamagui";

type AdsTabPropType = {
  user: UserType | null;
  header: React.ReactNode;
};

export default function AdsTab({ user, header }: AdsTabPropType) {
  const [adlId, setAdId] = useState<string | null>(null);
  const [isOpen, setOpen] = useState(false);
  const { ads } = useAds({ user_id: user?.id });

  const selectedAd = useMemo(
    () => ads?.find((ad) => ad.id === adlId),
    [adlId, ads]
  );

  const onClose = useCallback(() => {
    setAdId(null);
    setOpen(false);
  }, []);
  return (
    <>
      {!selectedAd && !isOpen ? (
        <YStack
          gap={24}
          flexGrow={1}
          paddingHorizontal={16}
          backgroundColor={colors["main"]}
        >
          {header}
          <FlatList
            data={ads || []}
            contentContainerStyle={{
              gap: 16,
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AdsTabItem
                {...item}
                onEdit={() => setAdId(item.id)}
              />
            )}
            ListFooterComponent={
              <Button
                variant="dark"
                sizeB="lg"
                onPress={() => setOpen(true)}
              >
                Add New Ad
              </Button>
            }
          />
        </YStack>
      ) : (
        <AddEditAdDialog
          onOpenChange={onClose}
          selectedAd={selectedAd}
          user_id={user?.id || ""}
        />
      )}
    </>
  );
}
