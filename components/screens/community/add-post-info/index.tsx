import BottomBar from "@/components/bottom-bar";
import InfoMessage from "@/components/info-message";
import { ADD_POST_GUIDELINES } from "@/components/screens/community/add-post-info/constants";
import Button from "@/components/ui/button";
import { colors, typography } from "@/tamagui.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CircleCheck, CircleX } from "@tamagui/lucide-icons";
import { Fragment, useCallback } from "react";
import { ScrollView, Text, XStack, YStack } from "tamagui";

export default function AddPostInfo({
  setFirstTime,
}: {
  setFirstTime: (v: boolean) => void;
}) {
  const onSubmit = useCallback(() => {
    setFirstTime(false);
    AsyncStorage.setItem("add-post", "true");
  }, []);

  return (
    <>
      <ScrollView
        width="100%"
        flexGrow={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 16,
          paddingHorizontal: 16,
          gap: 24,
          width: "100%",
          paddingBottom: 300,
        }}
      >
        <YStack gap={16}>
          <Text {...typography["heading-20"]}>Community Post Guideliness</Text>
          <InfoMessage
            text="Content in community feed should not include anything that is offensive, insensitive, upsetting and/or intended to disgust in exceptionally demeaning poor taste or down right creepy."
            backgroundColor="#F2F3F9"
            alignItems="flex-start"
            textColor="#000000"
            paddingVertical={8}
            paddingHorizontal={10}
            borderRadius={8}
          />
        </YStack>
        {ADD_POST_GUIDELINES.map((item) => (
          <Fragment key={item.id}>
            {item.list.map((subItem) => (
              <XStack
                key={subItem.id}
                gap={9}
                alignItems="center"
              >
                {item.type === "error" ? (
                  <CircleX
                    size={20}
                    color={colors["error"]}
                  />
                ) : (
                  <CircleCheck
                    size={20}
                    color={colors["success"]}
                  />
                )}

                <Text
                  width="90%"
                  {...typography["paragraph-17"]}
                >
                  {subItem.text}
                </Text>
              </XStack>
            ))}
          </Fragment>
        ))}
        <InfoMessage
          text="Users who fail to adhere to these guidelines will be suspend for a duration of time or be banned from the platform entirely."
          backgroundColor="#F2F3F9"
          alignItems="flex-start"
          textColor="#000000"
          paddingVertical={8}
          paddingHorizontal={10}
          borderRadius={8}
        />
      </ScrollView>
      <BottomBar bottom={100}>
        <Button
          variant="dark"
          sizeB="lg"
          onPress={onSubmit}
        >
          Got it!
        </Button>
      </BottomBar>
    </>
  );
}
