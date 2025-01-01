import PostFormDialog from "@/components/dialogs/post-form-dialog";
import LocationSelect from "@/components/forms/post-form/location-select";
import PostFormStep from "@/components/forms/post-form/post-form-step";
import PostGallery from "@/components/forms/post-form/post-gallery";
import TagsInput from "@/components/inputs/tags-input";
import { Form, FormElement } from "@/components/ui/form";
import Text from "@/components/ui/text";
import { colors } from "@/tamagui.config";
import { UseFormReturn } from "react-hook-form";
import { YStack } from "tamagui";

type PostFormPropType = {
  form: UseFormReturn<any>;
  step: number;
  edit?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
};

export default function PostForm({
  form,
  step,
  edit,
  onNext,
  onPrev,
}: PostFormPropType) {
  return (
    <Form {...form}>
      <PostGallery
        edit={edit}
        hideBlocks={step === 1 || edit}
        form={form}
        onNext={() => onNext?.()}
      />
      <PostFormDialog
        open={!!step}
        onOpenChange={() => onPrev?.()}
      >
        <Form {...form}>
          <YStack
            gap={24}
            paddingTop={24}
          >
            <PostFormStep stepNum={1}>
              <YStack
                gap={12}
                paddingHorizontal={16}
              >
                <FormElement
                  name="title"
                  placeholder="Write a title here"
                />
                <FormElement
                  name="description"
                  placeholder="Write a description here"
                />
              </YStack>
            </PostFormStep>
            <PostFormStep stepNum={2}>
              <YStack gap={16}>
                <Text
                  typo="reg-17"
                  color="secondary"
                  paddingVertical={10}
                  paddingHorizontal={16}
                  backgroundColor={colors["ghost-white"]}
                >
                  Add tags here. It will help users to find your posts easier.
                  For example: Hip-hop, Rap, Muzic, Guitar, Jazz, etc.
                </Text>
                <TagsInput form={form} />
              </YStack>
            </PostFormStep>
            <PostFormStep stepNum={3}>
              <YStack gap={16}>
                <LocationSelect form={form} />
              </YStack>
            </PostFormStep>
            <PostFormStep stepNum={4}>
              <YStack
                gap={16}
                paddingHorizontal={16}
                width="100%"
              >
                <FormElement
                  type="switch"
                  name="comment_on"
                  placeholder="Turn off commenting"
                />
                <FormElement
                  type="switch"
                  name="share_on"
                  placeholder="Turn off Sharing"
                />
              </YStack>
            </PostFormStep>
          </YStack>
        </Form>
      </PostFormDialog>
    </Form>
  );
}
