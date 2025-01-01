import CommonImage from "@/components/common-image";
import PricePerHour from "@/components/price-per-hour";
import ProfileLocation from "@/components/profile-location";
import Button from "@/components/ui/button";
import Text from "@/components/ui/text";
import { AdType } from "@/lib/types";
import { colors } from "@/tamagui.config";
import { Pencil } from "@tamagui/lucide-icons";
import { XStack, YStack } from "tamagui";

export default function AdsTabItem(ad: AdType & { onEdit: () => void }) {
  return (
    <YStack
      padding={8}
      borderRadius={5}
      borderWidth={1}
      borderColor={colors["light-gray"]}
      gap={8}
      width="100%"
    >
      <XStack
        gap={12}
        alignItems="center"
        width="100%"
      >
        <CommonImage
          width={92}
          height={92}
          resizeMode="cover"
          borderRadius={5}
        />
        <YStack
          width="70%"
          gap={6}
          justifyContent="space-between"
        >
          <XStack
            alignItems="center"
            justifyContent="space-between"
          >
            <ProfileLocation
              address={ad.address}
              maxWidth="60%"
            />
            <PricePerHour
              typoPrefix="reg-14"
              typoValue="bold-16"
              price={ad.price_per_hour}
            />
          </XStack>
          <Text typo="bold-16">{ad.title}</Text>
          <Text
            typo="medium-15"
            numberOfLines={2}
            height={38}
          >
            {ad.description}
          </Text>
        </YStack>
      </XStack>
      <Button
        sizeB="lg"
        variant="outlined"
        iconLeft={<Pencil size={16} />}
        gap={4}
        onPress={ad.onEdit}
      >
        Edit
      </Button>
    </YStack>
  );
}
