import CameraDialog from "@/components/dialogs/camera-dialog";
import SelectAlbumDialog from "@/components/dialogs/select-album-dialog";
import Button from "@/components/ui/button";
import { typography } from "@/tamagui.config";
import { Camera, ChevronDown } from "@tamagui/lucide-icons";
import { Album } from "expo-media-library";
import { useCallback, useState } from "react";
import { XStack } from "tamagui";

type PostGalleryFuncPropType = {
  currentAlbum?: Album | null;
  albums: Album[];
  setCurrentAlbum: (album: Album) => void;
  onValueChange: (file: any[]) => void;
};

export default function PostGalleryFunc({
  currentAlbum,
  albums,
  setCurrentAlbum,
  onValueChange,
}: PostGalleryFuncPropType) {
  const [isOpen, setOpen] = useState(false);
  const [isCameraOpen, setCameraOpen] = useState(false);

  const onAlbumSelect = useCallback(
    (album: Album) => {
      setCurrentAlbum(album);
      setOpen(false);
    },
    [setCurrentAlbum]
  );

  const onCameraValueChange = useCallback(
    (f: any[]) => {
      onValueChange(f);
      setCameraOpen(false);
    },
    [onValueChange]
  );

  return (
    <>
      <XStack
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={16}
        paddingVertical={12}
      >
        <Button
          width="auto"
          gap={0}
          iconRight={<ChevronDown size={18} />}
          variant="transparent"
          textProps={typography["heading-14"]}
          onPress={() => setOpen(true)}
        >
          {currentAlbum?.title}
        </Button>
        <Button
          iconLeft={<Camera size={18} />}
          variant="transparent"
          textProps={typography["heading-14"]}
          onPress={() => setCameraOpen(true)}
        >
          Take a Photo / Video
        </Button>
      </XStack>

      <SelectAlbumDialog
        open={isOpen}
        albums={albums}
        onValueChange={onAlbumSelect}
        onOpenChange={() => setOpen(false)}
      />
      <CameraDialog
        open={isCameraOpen}
        onOpenChange={() => setCameraOpen(false)}
        onAccept={onCameraValueChange}
      />
    </>
  );
}
