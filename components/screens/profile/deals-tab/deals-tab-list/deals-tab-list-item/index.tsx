import ProfileLocation from "@/components/profile-location";
import ProfileUser from "@/components/profile-user";
import { useUser } from "@/components/providers/user-provider";
import DetailsPeriod from "@/components/screens/details/details-period";
import { DealType } from "@/lib/types/deal";
import { colors, typography } from "@/tamagui.config";
import { Award } from "@tamagui/lucide-icons";
import { Text, XStack, YStack } from "tamagui";

export default function DealsTabListItem(
  deal: DealType & { onPress: () => void }
) {
  const { user } = useUser();
  return (
    <YStack
      padding={12}
      borderWidth={1}
      width="100%"
      borderColor={colors["light-gray"]}
      borderRadius={12}
      backgroundColor={colors["white"]}
      gap={16}
      onPress={deal.onPress}
    >
      <XStack
        alignItems="center"
        justifyContent="space-between"
      >
        <Text {...typography["heading-17"]}>Deal № {deal.deal_num}</Text>
        <Text
          {...typography["heading-17"]}
          color={colors[deal.status === "active" ? "success" : "disabled"]}
        >
          {deal.status[0].toUpperCase()}
          {deal.status.slice(1)}
        </Text>
      </XStack>
      <YStack gap={8}>
        <XStack
          gap={5}
          alignItems="center"
        >
          <Award
            size={16}
            color={colors["s-black"]}
          />
          <Text {...typography["paragraph-17"]}>{deal.ad.title}</Text>
        </XStack>
        <ProfileLocation
          sizeB="lg"
          address={deal.ad.address}
        />
        <DetailsPeriod
          start_date={deal.ad.start_date}
          end_date={deal.ad.end_date}
          noMargin
        />
        <ProfileUser user={deal.performer} />
      </YStack>
    </YStack>
  );
}
