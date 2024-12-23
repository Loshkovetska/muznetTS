import CommonImage from "@/components/common-image";
import Button from "@/components/ui/button";
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
  backgroundColor: "#F5F6FB",
  overflow: "hidden",
});

export default function MediaSelect({ form }: { form: UseFormReturn<any> }) {
  const photos = useWatch({ control: form.control, name: "photo" });

  const pickImage = useCallback(async () => {
    const result = await ImagePickerNative.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.5,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      if (result.assets?.length) {
        const file = result.assets[0];

        setValueToForm(form, "photo", [
          ...photos,
          {
            ...file,
            fileName: `${new Date().getTime()}_${form.getValues(
              "surname"
            )}.png`,
          },
        ]);
      }
    } else {
      alert("You did not select any image.");
    }
  }, [form, photos]);

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
        <Text {...typography["label-20"]}>Media</Text>
        <Text
          {...typography["paragraph-17"]}
          color="#697A8D"
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
              backgroundColor="rgba(92,101,116,0.6)"
              sizeB="icon-sm"
              position="absolute"
              top={4}
              right={4}
              onPress={() => onDelete(ind)}
            >
              <Trash
                size={18}
                color={colors["white"]}
              />
            </Button>
          </Container>
        ))}
        {photos.length <= 3 && (
          <Container onPress={pickImage}>
            <Plus />
            <Text {...typography["label-15"]}>Add new</Text>
          </Container>
        )}
      </XStack>
    </YStack>
  );
}
