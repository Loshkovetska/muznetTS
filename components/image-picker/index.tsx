import { Button, Text } from "@/components/ui";
import useImagePicker from "@/lib/hooks/image-picker.hook";
import { setValueToForm } from "@/lib/utils";
import { colors } from "@/tamagui.config";
import { AlertCircle, Pencil, UploadCloud } from "@tamagui/lucide-icons";
import * as ImagePickerNative from "expo-image-picker";
import { useCallback, useEffect, useState } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { Image, Stack, XStack, YStack, styled } from "tamagui";

const Wrapper = styled(Stack, {
  width: 120,
  height: 120,
  backgroundColor: colors["ghost-white"],
  borderRadius: 6,
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  borderWidth: 2,
  borderColor: "transparent",
  variants: {
    error: {
      true: {
        borderColor: colors["error"],
        backgroundColor: colors["main"],
      },
    },
  },
});

const ImageWrapper = styled(Stack, {
  overflow: "hidden",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: 6,
});

const StyledError = styled(XStack, {
  paddingVertical: 6,
  paddingHorizontal: 12,
  backgroundColor: colors["light-error"],
  borderRadius: 8,
  alignItems: "center",
  gap: 8,
});

type ImagePickerPropType = {
  error?: boolean;
  form: UseFormReturn<any>;
};

export default function ImagePicker({ error, form }: ImagePickerPropType) {
  const [imageUrl, setUrl] = useState<string | null>(null);
  const storedImage = useWatch({ control: form.control, name: "photo" });

  const onSuccess = useCallback(
    (file: ImagePickerNative.ImagePickerAsset) => {
      setUrl(file.uri);

      const images = storedImage.filter((_: any, ind: number) => !!ind);
      setValueToForm(form, "photo", [
        {
          ...file,
          fileName: `${new Date().getTime()}_${form.getValues("surname")}.png`,
        },
        ...images,
      ]);
    },
    [form, storedImage]
  );

  const { pickImage } = useImagePicker(onSuccess);

  useEffect(() => {
    if (typeof storedImage?.[0] === "string") {
      setUrl(process.env.EXPO_PUBLIC_SUPABASE_STORAGE + "/" + storedImage[0]);
    }

    if (!storedImage.length) {
      setUrl(null);
    }
  }, [storedImage]);

  return (
    <YStack
      gap={16}
      alignItems="center"
      marginBottom={16}
    >
      <Wrapper
        error={error}
        onPress={imageUrl ? undefined : () => pickImage()}
      >
        {!imageUrl && (
          <>
            <UploadCloud
              color={error ? colors["error"] : "black"}
              opacity={0.4}
              size={39}
            />
            <Text
              typo="medium-13"
              color={error ? "error" : "black"}
              opacity={error ? 1 : 0.5}
            >
              Upload photo
            </Text>
          </>
        )}
        {imageUrl && (
          <>
            <ImageWrapper>
              <Image
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                source={{ uri: imageUrl }}
                resizeMode="cover"
              />
            </ImageWrapper>
            <Button
              sizeB="icon"
              variant="dark"
              borderWidth={4}
              borderColor={colors["main"]}
              position="absolute"
              bottom={-24}
              right={-24}
              onPress={pickImage}
            >
              <Pencil
                color={colors["main"]}
                size={19}
              />
            </Button>
          </>
        )}
      </Wrapper>
      {error && (
        <StyledError>
          <AlertCircle
            color={colors["error"]}
            size={20}
          />
          <Text
            typo="medium-14"
            color="error"
          >
            Upload your photo
          </Text>
        </StyledError>
      )}
    </YStack>
  );
}
