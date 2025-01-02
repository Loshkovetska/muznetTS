import ChatItem from "@/components/screens/chat/chat-item";
import { Input, Text } from "@/components/ui";
import useMessages from "@/lib/hooks/messages.hook";
import { colors } from "@/tamagui.config";
import { Search } from "@tamagui/lucide-icons";
import { FlatList } from "react-native";
import { YStack } from "tamagui";

export default function Page() {
  const { chats, currentUser, searchValue, setSearchValue } = useMessages({
    enabled: true,
  });

  return (
    <YStack
      paddingTop={88}
      paddingHorizontal={16}
      backgroundColor={colors["main"]}
      flexGrow={1}
      gap={24}
    >
      <YStack gap={32}>
        <Text typo="bold-28">Messages</Text>
        <Input
          value={searchValue}
          placeholder="Search"
          variant="search"
          animate={false}
          iconLeft={
            <Search
              size={14}
              color={colors["dark-gray"]}
            />
          }
          onChangeText={setSearchValue}
        />
      </YStack>
      {chats?.length > 0 && (
        <FlatList
          data={chats}
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1 }}
          contentContainerStyle={{ gap: 8, paddingBottom: 250 }}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <ChatItem
              {...item}
              currentUserId={currentUser?.id || ""}
              key={item.id}
            />
          )}
        />
      )}
    </YStack>
  );
}
