import { Input } from "@/components/ui";
import { ChevronLeft, Search } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { XStack } from "tamagui";

type SearchHeaderpropType = {
  searchValue: string;
  setValue: (v: string) => void;
};

export default function SearchHeader({
  searchValue,
  setValue,
}: SearchHeaderpropType) {
  return (
    <XStack
      paddingTop={64}
      paddingHorizontal={16}
      width="100%"
      alignItems="center"
      gap={8}
    >
      <ChevronLeft
        size={30}
        onPress={() => router.back()}
      />
      <Input
        animate={false}
        value={searchValue}
        wrapper={{ width: "auto", flexGrow: 1 }}
        variant="search"
        sizeB="sm"
        iconLeft={<Search size={16} />}
        placeholder="Search"
        onChangeText={setValue}
      />
    </XStack>
  );
}
