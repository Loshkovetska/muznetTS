import { Text } from "@/components/ui";
import { SearchPostItemType } from "@/lib/types/post";
import { colors } from "@/tamagui.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChevronRight, Layers, MapPin } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { useCallback } from "react";
import { Stack, XStack, YStack } from "tamagui";

export default function SearchItem(item: SearchPostItemType) {
  const onSave = useCallback(async () => {
    const list = JSON.parse((await AsyncStorage.getItem("search")) || "[]");

    if (!list.length) {
      await AsyncStorage.setItem("search", JSON.stringify([item]));
      return;
    }

    const filteredList = list.filter(
      (l: SearchPostItemType) => JSON.stringify(l) !== JSON.stringify(item)
    );
    await AsyncStorage.setItem(
      "search",
      JSON.stringify([...filteredList, item])
    );
  }, [item]);

  return (
    <Link
      asChild
      href={`/(tabs)/(community)/search-list?${item.type}=${item.name}&count=${item.count}`}
      onPress={onSave}
    >
      <XStack
        paddingHorizontal={16}
        paddingVertical={8}
        gap={12}
        alignItems="center"
        width="100%"
      >
        <Stack
          width={48}
          height={48}
          borderWidth={1}
          borderRadius={24}
          borderColor={colors["light-gray"]}
          alignItems="center"
          justifyContent="center"
        >
          {item.type === "place" ? (
            <MapPin color={colors["gray-40"]} />
          ) : (
            <Layers color={colors["gray-40"]} />
          )}
        </Stack>
        <YStack
          flexGrow={1}
          gap={4}
        >
          <Text typo="bold-14">{item.name}</Text>
          <Text
            typo="medium-14"
            color="gray-60"
          >
            {item.count} {item.count === 1 ? "post" : "posts"}
          </Text>
        </YStack>
        <ChevronRight />
      </XStack>
    </Link>
  );
}
