import { useUser } from "@/components/providers/user-provider";
import AdsItem from "@/components/screens/homescreen/ads-list/ads-item";
import useAds from "@/lib/hooks/ads.hook";
import useMusicians from "@/lib/hooks/musicians.hook";
import { typography } from "@/tamagui.config";
import { Link } from "expo-router";
import { Text, XStack, YStack } from "tamagui";

type AdsListPropType = {
  type: "popular" | "similar";
  title: string;
  id?: string;
};

export default function AdsList({ type, title, id }: AdsListPropType) {
  const { user } = useUser();
  const { musicians } = useMusicians({
    id,
    enabled: user?.user_type === "contractor",
  });
  const { ads } = useAds({ id, enabled: user?.user_type !== "contractor" });

  const data = user?.user_type === "contractor" ? musicians : ads;
  if (!data?.length) return null;

  return (
    <YStack
      width="100%"
      gap={16}
    >
      <XStack
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text {...typography["heading-20"]}>{title}</Text>
        {type === "popular" && (
          <Link
            href="/"
            asChild
          >
            <Text {...typography["paragraph-17"]}>View all</Text>
          </Link>
        )}
      </XStack>
      <YStack
        width="100%"
        gap={8}
      >
        {data?.map((ad) => (
          <AdsItem
            {...ad}
            key={ad.id}
          />
        ))}
      </YStack>
    </YStack>
  );
}
