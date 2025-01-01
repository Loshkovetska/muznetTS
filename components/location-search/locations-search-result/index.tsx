import Text from "@/components/ui/text";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/lib/constants";
import { PredictionType } from "@/lib/types";
import { colors } from "@/tamagui.config";
import { useCallback } from "react";
import { FlatList } from "react-native";
import { XStack, YStack, styled } from "tamagui";

const StyledLocationsContent = styled(XStack, {
  padding: 16,
  position: "absolute",
  top: 48,
  left: 0,
  backgroundColor: colors["main"],
  width: "100%",
  borderInlineWidth: 1,
  borderBlockWidth: 1,
  maxHeight: 200,
  zIndex: 200_001,
  borderEndEndRadius: 6,
  borderEndStartRadius: 6,
  borderColor: colors["default-gray"],
  opacity: 0,
  visibility: "hidden",
  variants: {
    open: {
      true: {
        opacity: 1,
        visibility: "visible",
      },
    },
  },
});

type LocationSearchResultPropType = {
  results: PredictionType[];
  isOpen: boolean;
  mode?: "light" | "dark";
  position: { x: number; y: number };
  setOpen: (fl: boolean) => void;
  setValue: (v: string) => void;
  onChange: (item: PredictionType) => void;
};

export default function LocationSearchResult({
  results,
  isOpen,
  mode = "light",
  position,
  setOpen,
  setValue,
  onChange,
}: LocationSearchResultPropType) {
  const onSelect = useCallback(
    (item: PredictionType) => {
      setValue(item.properties.formatted);
      onChange(item);
      setOpen(false);
    },
    [onChange, setOpen, setValue]
  );
  return (
    <>
      <StyledLocationsContent
        open={isOpen}
        top={position.y - 1}
        left={position.x}
        width={SCREEN_WIDTH - position.x * 2}
      >
        <FlatList
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          data={results}
          style={{ width: "100%", zIndex: 1 }}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item }) => (
            <Text
              typo="reg-17"
              zIndex={2}
              color="black"
              onPress={() => onSelect(item)}
            >
              {item.properties.formatted}
            </Text>
          )}
          keyExtractor={(item) => JSON.stringify(item.bbox)}
        />
      </StyledLocationsContent>
      <YStack
        top={0}
        left={0}
        position="absolute"
        zIndex={200_000}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        opacity={isOpen ? 1 : 0}
        backgroundColor={mode === "light" ? "transparent" : colors["black-30"]}
        onPress={isOpen ? () => setOpen(false) : undefined}
      />
    </>
  );
}
