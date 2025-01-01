import ContractorImage from "@/assets/images/screens/add-profile-info/select_contractor.png";
import MusicianImage from "@/assets/images/screens/add-profile-info/select_musician.png";
import { Radio, RadioGroupItem } from "@/components/ui/radio";
import Text from "@/components/ui/text";
import { SCREEN_WIDTH } from "@/lib/constants";
import { Image, Stack, YStack, styled } from "tamagui";

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
          typo="medium-17"
          textAlign="center"
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
