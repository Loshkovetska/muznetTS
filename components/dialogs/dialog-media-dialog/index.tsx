import CommonImage from "@/components/common-image";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/lib/constants";
import { UserType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { FlatList } from "react-native";
import { Text, YStack } from "tamagui";

type DialogMediaDialogPropType = {
  open: boolean;
  chatUser?: UserType;
  media: string[];
  onOpenChange: () => void;
};

export default function DialogMediaDialog({
  open,
  chatUser,
  media,
  onOpenChange,
}: DialogMediaDialogPropType) {
  return (
    <YStack
      position="absolute"
      width={SCREEN_WIDTH}
      height={SCREEN_HEIGHT}
      top={0}
      left={0}
      backgroundColor={colors["white"]}
      opacity={!open ? 0 : 1}
      animateOnly={["opacity"]}
      paddingTop={64}
      gap={16}
      paddingHorizontal={16}
    >
      <ChevronLeft onPress={onOpenChange} />
      <YStack
        width="100%"
        alignItems="center"
        gap={16}
        marginBottom={32}
      >
        <CommonImage
          width={72}
          height={72}
          borderRadius={6}
          source={chatUser?.photo?.[0]}
        />
        <Text {...typography["heading-22"]}>
          {chatUser?.name} {chatUser?.surname}
        </Text>
      </YStack>
      {media.length > 0 && (
        <YStack gap={16}>
          <Text {...typography["heading-20"]}>Shared files</Text>
          <FlatList
            data={media}
            numColumns={4}
            keyExtractor={(item) => item}
            style={{
              marginInline: -4,
              marginVertical: -4,
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 300,
            }}
            renderItem={({ item }) => (
              <CommonImage
                width={(SCREEN_WIDTH - 56) / 4}
                height={(SCREEN_WIDTH - 56) / 4}
                margin={4}
                borderRadius={6}
                source={item}
                key={item}
              />
            )}
          />
        </YStack>
      )}
    </YStack>
  );
}
