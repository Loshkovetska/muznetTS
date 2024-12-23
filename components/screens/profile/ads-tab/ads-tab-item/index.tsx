import CommonImage from "@/components/common-image";
import PricePerHour from "@/components/price-per-hour";
import ProfileLocation from "@/components/profile-location";
import Button from "@/components/ui/button";
import { AdType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { Pencil } from "@tamagui/lucide-icons";
import { Text, XStack, YStack } from "tamagui";

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
            <ProfileLocation address={ad.address} />
            <PricePerHour
              price={ad.price_per_hour}
              sizeB="sm-16"
            />
          </XStack>
          <Text {...typography["heading-16"]}>{ad.title}</Text>
          <Text
            {...typography["label-15"]}
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
