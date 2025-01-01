import { ALBUMS_ICONS } from "@/components/dialogs/select-album-dialog/constants";
import { MobileSheet } from "@/components/ui/mobile-sheet";
import { typography } from "@/tamagui.config";
import { X } from "@tamagui/lucide-icons";
import { Album } from "expo-media-library";
import { useCallback } from "react";
import { Stack, Text, XStack, YStack } from "tamagui";

type SelectAlbumDialogPropType = {
  open: boolean;
  albums: Album[];
  onOpenChange: () => void;
  onValueChange: (album: Album) => void;
};

export default function SelectAlbumDialog({
  open,
  albums,
  onOpenChange,
  onValueChange,
}: SelectAlbumDialogPropType) {
  const getAlbumIcon = useCallback((title: string) => {
    const Icon = ALBUMS_ICONS?.[title as "Favorites"] || ALBUMS_ICONS["All"];
    return <Icon size={20} />;
  }, []);

  return (
    <MobileSheet
      open={open}
      showThumb={false}
      scrollViewMaxHeight={500}
      scrollPaddingBotton={50}
      header={
        <XStack
          alignItems="center"
          justifyContent="space-between"
        >
          <Text {...typography["heading-20"]}>Select album</Text>
          <X
            size={20}
            onPress={onOpenChange}
          />
        </XStack>
      }
      onOpenChange={onOpenChange}
    >
      <YStack gap={16}>
        <YStack>
          {albums?.map((album) => (
            <XStack
              paddingVertical={8}
              borderBottomWidth={1}
              borderColor="#E9ECF2"
              gap={8}
              alignItems="center"
              onPress={() => onValueChange(album)}
            >
              <Stack
                width={40}
                height={40}
                borderRadius={20}
                borderWidth={1}
                borderColor="#E9ECF2"
                alignItems="center"
                justifyContent="center"
              >
                {getAlbumIcon(album.title)}
              </Stack>
              <YStack
                key={album.id}
                pointerEvents={album.assetCount ? "auto" : "none"}
                gap={4}
              >
                <Text {...typography["heading-17"]}>{album.title}</Text>
                <Text
                  {...typography["label-14"]}
                  color="rgba(92, 101, 116, 0.6)"
                >
                  {album.assetCount} media
                </Text>
              </YStack>
            </XStack>
          ))}
        </YStack>
      </YStack>
    </MobileSheet>
  );
}
