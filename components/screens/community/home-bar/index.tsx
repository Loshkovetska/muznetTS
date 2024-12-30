import Button from "@/components/ui/button";
import { colors, typography } from "@/tamagui.config";
import { Plus, Search } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { Text, XStack } from "tamagui";

export default function Homebar() {
  return (
    <XStack
      width="100%"
      paddingTop={64}
      backgroundColor={colors["white"]}
      paddingHorizontal={16}
      paddingBottom={9}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text {...typography["heading-24"]}>Community</Text>
      <XStack
        alignItems="center"
        gap={16}
      >
        <Link
          asChild
          href="/(tabs)/(community)/search"
        >
          <Search />
        </Link>
        <Link
          asChild
          href="/(tabs)/(community)/add-post"
        >
          <Button
            variant="white"
            sizeB="icon-filter"
          >
            <Plus />
          </Button>
        </Link>
      </XStack>
    </XStack>
  );
}
