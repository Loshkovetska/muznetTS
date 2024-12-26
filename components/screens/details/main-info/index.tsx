import GenresList from "@/components/genres-list";
import InfoMessage from "@/components/info-message";
import ProfileLocation from "@/components/profile-location";
import RateBlock from "@/components/rate-block";
import DetailsCarousel from "@/components/screens/details/carousel";
import DetailsDescription from "@/components/screens/details/description";
import DetailsList from "@/components/screens/details/details-list";
import DetailsMedia from "@/components/screens/details/details-media";
import DetailsPeriod from "@/components/screens/details/details-period";
import ReviewsList from "@/components/screens/details/reviews-list";
import AdsList from "@/components/screens/homescreen/ads-list";
import Separator from "@/components/ui/separator";
import { AdType, UserType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
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

  const title = useMemo(
    () => (
      <Text
        {...typography[isMusician ? "heading-28" : "heading-20"]}
        numberOfLines={2}
        ellipsizeMode="tail"
        marginTop={8}
        marginBottom={13}
        fontFamily="MulishExtraBold"
      >
        {isMusician ? `${data.name} ${data.surname}` : data.title}
      </Text>
    ),
    [data, isMusician]
  );

  return (
    <>
      <DetailsCarousel
        images={data.photo?.length ? data.photo : null}
        onOpen={data.openFullDialog}
      />
      <Container>
        <XStack
          alignItems="center"
          justifyContent="space-between"
        >
          {!isMusician ? title : null}
          {isMusician && (
            <ProfileLocation
              address={data.address}
              sizeB="lg"
            />
          )}
          <RateBlock
            screenType="card"
            reviewData={data.rate}
          />
        </XStack>
        {!isMusician && (
          <ProfileLocation
            address={data.address}
            sizeB="lg"
          />
        )}
        {!isMusician && (
          <DetailsPeriod
            start_date={data.start_date}
            end_date={data.end_date}
          />
        )}
        {isMusician ? title : null}
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
          {!isMusician && <Separator />}
          <DetailsDescription
            title={isMusician ? undefined : "We are looking for:"}
            text={data.description}
          />
          {isMusician && data.group_members?.length > 0 && (
            <DetailsList
              title="Band members:"
              list={data.group_members}
            />
          )}
          {data.musical_instruments?.length > 0 && (
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
          <InfoMessage text="To protect your payment, never transfer money or communicate outside of the MuzNet app" />
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
