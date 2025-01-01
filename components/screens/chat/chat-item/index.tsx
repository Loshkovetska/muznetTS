import CommonImage from "@/components/common-image";
import { ChatItemType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import dayjs from "dayjs";
import { Link } from "expo-router";
import { Stack, Text, XStack, YStack } from "tamagui";

export default function ChatItem(
  chat: ChatItemType & { currentUserId: string }
) {
  const currentUser =
    chat.user1.id === chat.currentUserId ? chat.user2 : chat.user1;

  return (
    <Link
      href={`/chat/${chat.id}/messages`}
      asChild
    >
      <XStack
        gap={12}
        borderRadius={6}
        borderWidth={1}
        borderColor={colors["light-gray"]}
        padding={8}
        alignItems="center"
      >
        <XStack
          flexGrow={1}
          alignItems="center"
          gap={16}
        >
          <CommonImage
            width={48}
            height={48}
            borderRadius={6}
            source={currentUser.photo?.[0]}
          />
          <YStack
            gap={4}
            maxWidth="70%"
          >
            <XStack
              alignItems="center"
              gap={6}
            >
              <Text
                {...typography["bold-15"]}
                numberOfLines={1}
              >
                {currentUser.name} {currentUser.surname}
              </Text>
              {chat.count_to_read > 0 && (
                <Stack
                  width={16}
                  height={16}
                  borderRadius={8}
                  backgroundColor={colors["black"]}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    {...typography["bold-10"]}
                    color={colors["main"]}
                  >
                    {chat.count_to_read}
                  </Text>
                </Stack>
              )}
            </XStack>

            <Text
              {...typography["reg-15"]}
              numberOfLines={1}
              color={colors["gray-100"]}
            >
              {chat.last_message}
            </Text>
          </YStack>
        </XStack>
        <Text
          {...typography["reg-12"]}
          color={colors["ghost"]}
          alignSelf="flex-start"
        >
          {dayjs(chat.created_at).format("HH:MM")}
        </Text>
      </XStack>
    </Link>
  );
}
