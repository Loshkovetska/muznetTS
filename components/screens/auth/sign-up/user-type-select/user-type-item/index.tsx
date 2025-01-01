import ContractorImage from "@/assets/images/screens/add-profile-info/select_contractor.png";
import MusicianImage from "@/assets/images/screens/add-profile-info/select_musician.png";
import { Radio, RadioGroupItem } from "@/components/ui/radio";
import { SCREEN_WIDTH } from "@/lib/constants";
import { typography } from "@/tamagui.config";
import { Image, Stack, Text, YStack, styled } from "tamagui";

const StyledRadioWrapper = styled(Stack, {
  position: "absolute",
  top: -6,
  right: -8,
});

export default function UserTypeItem({
  type,
  selected,
}: {
  type: "contractor" | "musician";
  selected: boolean;
}) {
  return (
    <RadioGroupItem
      htmlFor={type}
      maxWidth={SCREEN_WIDTH / 2 - 24}
      selected={selected}
    >
      <YStack
        alignItems="center"
        gap={8}
        width="100%"
      >
        <Image
          source={type === "contractor" ? ContractorImage : MusicianImage}
          resizeMode="cover"
          height={219}
        />
        <Text
          textAlign="center"
          {...typography["medium-17"]}
        >
          {type === "contractor" ? "Contractor" : "Musician"}
        </Text>
        <StyledRadioWrapper>
          <Radio
            value={type}
            id={type}
          />
        </StyledRadioWrapper>
      </YStack>
    </RadioGroupItem>
  );
}
