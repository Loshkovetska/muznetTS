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
      backgroundColor={colors["main"]}
      paddingHorizontal={16}
      paddingBottom={9}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text {...typography["bold-24"]}>Community</Text>
      <XStack
        alignItems="center"
        gap={16}
      >
        <Link href="/(tabs)/(community)/search">
          <Search />
        </Link>
        <Link
          href="/(tabs)/(community)/add-post"
          asChild
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
