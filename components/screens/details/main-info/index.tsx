import GenresList from "@/components/genres-list";
import ProfileLocation from "@/components/profile-location";
import RateBlock from "@/components/rate-block";
import DetailsCarousel from "@/components/screens/details/carousel";
import DetailsDescription from "@/components/screens/details/description";
import DetailsList from "@/components/screens/details/details-list";
import DetailsMedia from "@/components/screens/details/details-media";
import ReviewsList from "@/components/screens/details/reviews-list";
import AdsList from "@/components/screens/homescreen/ads-list";
import Separator from "@/components/ui/separator";
import { AdType, UserType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { AlertCircle } from "@tamagui/lucide-icons";
import { useMemo } from "react";
import { Text, XStack, YStack, styled } from "tamagui";

const Container = styled(YStack, {
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  backgroundColor: colors["white"],
  paddingVertical: 24,
  paddingHorizontal: 16,
  marginTop: -16,
});

type MainInfoPropType = {
  profile_id?: string;
  ad_id?: string;
  openFullDialog: (ind: number) => void;
  openReviews: () => void;
} & (UserType | AdType);

export default function MainInfo(data: MainInfoPropType) {
  const isMusician = "surname" in data;

  const skills = useMemo(() => {
    return isMusician
      ? ([
          data.sing_by_ear ? "Sing by ear" : null,
          data.play_by_ear ? "Play by ear" : null,
          data.read_sheet_music ? "Read sheet music" : null,
        ].filter((d) => d) as string[])
      : [];
  }, [isMusician, data]);

  return (
    <>
      <DetailsCarousel
        images={isMusician && data.photo?.length ? data.photo : null}
        onOpen={data.openFullDialog}
      />
      <Container>
        <XStack
          alignItems="center"
          justifyContent="space-between"
        >
          <ProfileLocation
            address={data.address}
            sizeB="lg"
          />
          <RateBlock
            screenType="card"
            reviewData={data.rate}
          />
        </XStack>
        <Text
          {...typography["heading-ext28"]}
          numberOfLines={2}
          ellipsizeMode="tail"
          marginTop={8}
          marginBottom={13}
        >
          {isMusician ? `${data.name} ${data.surname}` : data.title}
        </Text>
        {isMusician && (
          <GenresList
            genres={data.musical_genres}
            type="card"
          />
        )}
        <YStack
          gap={24}
          marginTop={20}
          width="100%"
        >
          <DetailsDescription text={data.description} />
          {isMusician && data.group_members?.length > 0 && (
            <DetailsList
              title="Band members:"
              list={data.group_members}
            />
          )}
          {isMusician && data.musical_instruments?.length > 0 && (
            <DetailsList
              title="Instruments:"
              list={data.musical_instruments}
            />
          )}
          {skills?.length > 0 && (
            <DetailsList
              title="Skills:"
              list={skills}
            />
          )}
          {isMusician && data.willing_to_travel && (
            <DetailsList
              title="Other:"
              list={["Willing to travel interstate for gigs"]}
            />
          )}
          {isMusician && (
            <DetailsMedia
              onOpen={() => data.openFullDialog(0)}
              images={data.photo || []}
            />
          )}
          <ReviewsList
            rate={data.rate}
            type="carousel"
            profile_id={data.profile_id}
            ad_id={data.ad_id}
            onOpen={data.openReviews}
          />
          <Separator />
          <XStack
            gap={8}
            alignItems="center"
          >
            <AlertCircle color="#B9B9BA" />
            <Text
              {...typography["paragraph-14"]}
              fontSize={13}
              color="#717171"
            >
              To protect your payment, never transfer money or communicate
              outside of the MuzNet app
            </Text>
          </XStack>
          <AdsList
            title="You also may like"
            type="similar"
            id={data.id}
          />
        </YStack>
      </Container>
    </>
  );
}
