import ProfileLocation from "@/components/profile-location";
import ProfileUser from "@/components/profile-user";
import { useUser } from "@/components/providers/user-provider";
import DetailsPeriod from "@/components/screens/details/details-period";
import { AdType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { Award } from "@tamagui/lucide-icons";
import { Text, XStack, YStack } from "tamagui";

export default function DealsTabListItem(ad: AdType & { onPress: () => void }) {
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
      onPress={ad.onPress}
    >
      <XStack
        alignItems="center"
        justifyContent="space-between"
      >
        <Text {...typography["heading-17"]}>Deal № {ad.deal_number}</Text>
        <Text
          {...typography["heading-17"]}
          color={colors[ad.status === "active" ? "success" : "disabled"]}
        >
          {ad.status[0].toUpperCase()}
          {ad.status.slice(1)}
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
          <Text {...typography["paragraph-17"]}>{ad.title}</Text>
        </XStack>
        <ProfileLocation
          sizeB="lg"
          address={ad.address}
        />
        <DetailsPeriod
          start_date={ad.start_date}
          end_date={ad.end_date}
          noMargin
        />
        <ProfileUser user={user} />
      </YStack>
    </YStack>
  );
}
