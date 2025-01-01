import LocationSelect from "@/components/forms/post-form/location-select";
import PostFormStep from "@/components/forms/post-form/post-form-step";
import PostGallery from "@/components/forms/post-form/post-gallery";
import TagsInput from "@/components/inputs/tags-input";
import { Form, FormElement } from "@/components/ui/form";
import { typography } from "@/tamagui.config";
import { UseFormReturn } from "react-hook-form";
import { Text, YStack } from "tamagui";

type PostFormPropType = {
  form: UseFormReturn<any>;
  step: number;
};

export default function PostForm({ form, step }: PostFormPropType) {
  return (
    <Form {...form}>
      {step && (
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
                {...typography["paragraph-17"]}
                paddingVertical={10}
                paddingHorizontal={16}
                backgroundColor="#F2F3F9"
                color="#141517"
              >
                Add tags here. It will help users to find your posts easier. For
                example: Hip-hop, Rap, Muzic, Guitar, Jazz, etc.
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
      )}
      {!step && <PostGallery form={form} />}
    </Form>
  );
}