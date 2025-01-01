import CommonImage from "@/components/common-image";
import Button from "@/components/ui/button";
import useImagePicker from "@/lib/hooks/image-picker.hook";
import { setValueToForm } from "@/lib/utils";
import { colors, typography } from "@/tamagui.config";
import { Plus, Trash } from "@tamagui/lucide-icons";
import * as ImagePickerNative from "expo-image-picker";
import { useCallback } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { Stack, Text, XStack, YStack, styled } from "tamagui";

const Container = styled(Stack, {
  width: 106,
  height: 106,
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  borderRadius: 6,
  backgroundColor: colors["ghost-white2"],
  overflow: "hidden",
});

export default function MediaSelect({ form }: { form: UseFormReturn<any> }) {
  const photos = useWatch({ control: form.control, name: "photo" });
  const onSuccess = useCallback(
    (file: ImagePickerNative.ImagePickerAsset) => {
      setValueToForm(form, "photo", [
        ...photos,
        {
          ...file,
          fileName: `${new Date().getTime()}_${form.getValues("surname")}.png`,
        },
      ]);
    },
    [form, photos]
  );

  const { pickImage } = useImagePicker(onSuccess);

  const onDelete = useCallback(
    (id: number) => {
      setValueToForm(
        form,
        "photo",
        photos.filter((_: any, ind: number) => ind !== id)
      );
    },
    [photos, form]
  );

  return (
    <YStack gap={16}>
      <YStack gap={8}>
        <Text {...typography["medium-20"]}>Media</Text>
        <Text
          {...typography["reg-17"]}
          color={colors["slate-gray"]}
        >
          You can upload up to 4 photos
        </Text>
      </YStack>
      <XStack
        flexWrap="wrap"
        gap={12}
      >
        {photos.map((photo: any, ind: number) => (
          <Container key={ind}>
            <CommonImage
              source={typeof photo === "string" ? photo : photo.uri}
              width="100%"
              height="100%"
              borderWidth={0}
              local={typeof photo !== "string"}
            />
            <Button
              backgroundColor={colors["gray-60"]}
              sizeB="icon-sm"
              position="absolute"
              top={4}
              right={4}
              onPress={() => onDelete(ind)}
            >
              <Trash
                size={18}
                color={colors["main"]}
              />
            </Button>
          </Container>
        ))}
        {photos.length <= 3 && (
          <Container onPress={pickImage}>
            <Plus />
            <Text {...typography["medium-15"]}>Add new</Text>
          </Container>
        )}
      </XStack>
    </YStack>
  );
}
