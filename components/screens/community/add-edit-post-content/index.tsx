import CommonHeader from "@/components/common-header";
import PostForm from "@/components/forms/post-form";
import AddPostInfo from "@/components/screens/community/add-post-info";
import Button from "@/components/ui/button";
import usePosts from "@/lib/hooks/posts.hook";
import { postScheme } from "@/lib/scheme";
import { colors, typography } from "@/tamagui.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, X } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { Stack, YStack } from "tamagui";
import { z } from "zod";

type AddEditPostContentPropType = {
  id?: string;
  firstTime?: boolean;
  step: number;
  defaultValues?: z.infer<typeof postScheme>;
  setFirstTime?: Dispatch<SetStateAction<boolean>>;
  onPrev?: () => void;
  onNext?: () => void;
};

export default function AddEditPostContent({
  firstTime,
  defaultValues,
  step,
  id,
  onPrev,
  onNext,
  setFirstTime,
}: AddEditPostContentPropType) {
  const [hideForm, setHideForm] = useState(false);
  const { addPost, updatePost, isAddPending, isUpdatePending } = usePosts({
    onAddUpdateSuccess: () => {
      setHideForm(true);
      router.push(
        `/(tabs)/(community)/home?${id ? "updating" : "loading"}=true`
      );
    },
  });
  const form = useForm({
    defaultValues: {
      media: [],
      title: "",
      description: "",
      tags: [],
      comment_on: true,
      share_on: true,
      location: "",
    },
    resolver: zodResolver(postScheme),
    mode: "onChange",
  });

  const buttonLeft = useMemo(() => {
    if (!setFirstTime) {
      return (
        <Button
          variant="transparent"
          textProps={typography["heading-14"]}
          onPress={() => router.back()}
        >
          Cancel
        </Button>
      );
    }
    return !firstTime ? (
      !step ? (
        <AlertCircle
          onPress={() => setFirstTime(true)}
          size={20}
        />
      ) : undefined
    ) : (
      <Stack />
    );
  }, [firstTime, step, setFirstTime]);

  const onSubmit = useCallback(
    (values: z.infer<typeof postScheme>) => {
      id ? updatePost({ ...values, id }) : addPost(values);
    },
    [id, addPost, updatePost]
  );

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues as any, {
        keepDirty: true,
        keepTouched: true,
      });
    }
  }, [defaultValues, form]);

  return (
    <YStack
      backgroundColor={colors["white"]}
      flexGrow={1}
    >
      <CommonHeader
        title={setFirstTime ? "Create New Post" : "Edit Post"}
        onBack={onPrev}
        buttonLeft={buttonLeft}
        buttonRight={
          !step ? (
            <X
              onPress={() => router.back()}
              size={20}
            />
          ) : (
            <Button
              variant="transparent"
              textProps={{
                ...typography["heading-14"],
                color: form.formState.isValid ? undefined : colors["disabled"],
                pointerEvents: form.formState.isValid ? "auto" : "none",
              }}
              loading={isAddPending || isUpdatePending}
              onPress={form.handleSubmit(onSubmit)}
            >
              {setFirstTime ? "Post" : "Save"}
            </Button>
          )
        }
        justifyContent="space-between"
        paddingHorizontal={16}
        withBorder
      />

      {firstTime && setFirstTime && <AddPostInfo setFirstTime={setFirstTime} />}
      {!firstTime && !hideForm && (
        <PostForm
          step={step}
          form={form}
          edit={!!id}
          onNext={onNext}
          onPrev={onPrev}
        />
      )}
    </YStack>
  );
}
