import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { MobileSheet } from "@/components/ui/mobile-sheet";
import useLocations from "@/lib/hooks/location.hook";
import { typography } from "@/tamagui.config";
import { Search, X } from "@tamagui/lucide-icons";
import { useCallback } from "react";
import { Text, XStack, YStack } from "tamagui";

type LocationSelectDialogPropType = {
  open: boolean;
  defaultValue: string;
  onOpenChange: () => void;
  onValueChange: (v: string) => void;
};
export default function LocationSelectDialog({
  open,
  defaultValue,
  onOpenChange,
  onValueChange,
}: LocationSelectDialogPropType) {
  const { value, list, onInputChange, setValue } = useLocations(defaultValue);

  const getText = useCallback(
    (text: string) => {
      const index = text.toLowerCase().indexOf(value.toLocaleLowerCase());
      if (index === -1) return text;
      const boldText = text.slice(index, value.length);
      return (
        <>
          <Text
            color="#17191D"
            {...typography["heading-17"]}
          >
            {boldText}
          </Text>
          {text.slice(boldText.length)}
        </>
      );
    },
    [value]
  );
  return (
    <MobileSheet
      open={open}
      showThumb={false}
      header={
        <XStack
          alignItems="center"
          justifyContent="space-between"
        >
          <Text {...typography["heading-20"]}>Add Location</Text>
          <X
            size={20}
            onPress={onOpenChange}
          />
        </XStack>
      }
      onOpenChange={onOpenChange}
    >
      <YStack
        gap={24}
        minHeight={400}
      >
        <Input
          iconLeft={<Search size={18} />}
          iconRight={
            value.length ? (
              <Button
                variant="transparent"
                textProps={typography["heading-14"]}
                onPress={() => setValue("")}
              >
                Clear
              </Button>
            ) : undefined
          }
          value={value}
          onChangeText={onInputChange}
          wrapper={{ borderWidth: 0, borderBottomWidth: 1 }}
        />
        <YStack gap={4}>
          <Text
            {...typography["paragraph-17"]}
            color="#B9B9BA"
          >
            Searching results
          </Text>
          {list.map((item) => (
            <YStack
              gap={4}
              key={item.properties.place_id}
              paddingVertical={8}
              borderBottomWidth={1}
              borderColor="#E9ECF2"
              onPress={() => onValueChange(item.properties.address_line1)}
            >
              <Text
                {...typography["heading-17"]}
                color="rgba(92, 101, 116, 0.6)"
              >
                {getText(item.properties.address_line1)}
              </Text>
              <Text
                {...typography["label-14"]}
                color="rgba(92, 101, 116, 0.6)"
              >
                {item.properties.city}, {item.properties.country}
              </Text>
            </YStack>
          ))}
        </YStack>
      </YStack>
    </MobileSheet>
  );
}
