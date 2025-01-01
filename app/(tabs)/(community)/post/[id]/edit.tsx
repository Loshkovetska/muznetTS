import CommonHeader from "@/components/common-header";
import PostForm from "@/components/forms/post-form";
import Button from "@/components/ui/button";
import { colors, typography } from "@/tamagui.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { YStack } from "tamagui";
import { z } from "zod";

export default function Page() {
  const { id } = useLocalSearchParams();

  const onSubmit = useCallback(() => {}, []);

  const form = useForm({
    defaultValues: {
      media: [],
      title: "",
      description: "",
    },
    resolver: zodResolver(
      z.object({
        media: z.array(z.any()).refine((m) => m.length, "Select media"),
        title: z.string().min(3, "Too small title"),
        desciprion: z.string().optional(),
        tags: z.array(z.string()),
      })
    ),
    mode: "onChange",
  });

  return (
    <YStack
      backgroundColor={colors["white"]}
      flexGrow={1}
    >
      <CommonHeader
        title="Edit Post"
        buttonLeft={
          <Button
            variant="transparent"
            textProps={typography["heading-14"]}
            onPress={() => router.back()}
          >
            Cancel
          </Button>
        }
        buttonRight={
          <Button
            variant="transparent"
            textProps={typography["heading-14"]}
            onPress={onSubmit}
          >
            Save
          </Button>
        }
        justifyContent="space-between"
        paddingHorizontal={16}
        withBorder
      />

      <PostForm
        step={1}
        form={form}
      />
    </YStack>
  );
}
