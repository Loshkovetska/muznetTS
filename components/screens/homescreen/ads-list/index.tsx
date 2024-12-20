import AdsItem from "@/components/screens/homescreen/ads-list/ads-item";
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
  const { musicians } = useMusicians({ id });

  if (!musicians?.length) return null;
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
        {musicians?.map((ad) => (
          <AdsItem
            {...ad}
            key={ad.id}
          />
        ))}
      </YStack>
    </YStack>
  );
}
