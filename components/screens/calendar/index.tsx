import Image1 from "@/assets/images/screens/calendar/calendar_bg_1.png";
import Image2 from "@/assets/images/screens/calendar/calendar_bg_2.png";
import ProfileLocation from "@/components/profile-location";
import ProfileUser from "@/components/profile-user";
import DetailsPeriod from "@/components/screens/details/details-period";
import { DealType } from "@/lib/types/deal";
import { colors, typography } from "@/tamagui.config";
import { Image, Text, YStack, styled } from "tamagui";

const Container = styled(YStack, {
  borderRadius: 8,
  overflow: "hidden",
});

const Content = styled(YStack, {
  paddingTop: 14,
  paddingHorizontal: 16,
  paddingBottom: 16,
  backgroundColor: colors["white"],
  borderWidth: 1,
  borderColor: colors["light-gray"],
  gap: 20,
});

type CalendarItemPropType = {
  order: number;
} & DealType;

export default function CalendarItem(props: CalendarItemPropType) {
  const { ad, order, ...deal } = props;
  const imgSource = !(order % 2) ? Image1 : Image2;
  return (
    <Container>
      <Image
        source={imgSource}
        width="100%"
        height={44}
        resizeMode="cover"
      />
      <Content>
        <Text {...typography["heading-20"]}>{ad.title}</Text>
        <YStack gap={12}>
          <DetailsPeriod
            noMargin
            start_date={ad.start_date}
            end_date={ad.end_date}
          />
          <ProfileLocation
            address={ad.address}
            sizeB="lg"
          />
          <ProfileUser user={deal.performer} />
        </YStack>
      </Content>
    </Container>
  );
}
