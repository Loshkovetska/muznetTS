import CommonHeader from "@/components/common-header";
import PostForm from "@/components/forms/post-form";
import AddPostInfo from "@/components/screens/community/add-post-info";
import Button from "@/components/ui/button";
import { colors, typography } from "@/tamagui.config";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AlertCircle, X } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Stack, YStack } from "tamagui";
import { z } from "zod";

export default function Page() {
  const [firstTime, setFirstTime] = useState(true);
  const [step, setStep] = useState(0);

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
        locations: z.string().min(2, "Select location"),
        tags: z.array(z.string()),
        comment_on: z.boolean(),
        share_on: z.boolean(),
      })
    ),
    mode: "onChange",
  });

  useEffect(() => {
    AsyncStorage.getItem("add-post").then((res) => setFirstTime(!res));
  }, []);

  return (
    <YStack
      backgroundColor={colors["white"]}
      flexGrow={1}
    >
      <CommonHeader
        title="Create New Post"
        onBack={() => setStep((prev) => prev - 1)}
        buttonLeft={
          !firstTime ? (
            !step ? (
              <AlertCircle
                onPress={() => setFirstTime(true)}
                size={20}
              />
            ) : undefined
          ) : (
            <Stack />
          )
        }
        buttonRight={
          !step ? (
            <X
              onPress={() => router.back()}
              size={20}
            />
          ) : (
            <Button
              variant="transparent"
              textProps={typography["heading-14"]}
            >
              Post
            </Button>
          )
        }
        justifyContent="space-between"
        paddingHorizontal={16}
        withBorder
      />
      {firstTime && <AddPostInfo setFirstTime={setFirstTime} />}
      {!firstTime && (
        <PostForm
          step={step}
          form={form}
        />
      )}
    </YStack>
  );
}
