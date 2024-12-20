import CommonImage from "@/components/common-image";
import GenresList from "@/components/genres-list";
import PricePerHour from "@/components/price-per-hour";
import ProfileLocation from "@/components/profile-location";
import RateBlock from "@/components/rate-block";
import { AdType, UserType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { Link } from "expo-router";
import { useMemo } from "react";
import { Text, XStack, YStack, styled } from "tamagui";

const ItemContainer = styled(XStack, {
  width: "100%",
  borderRadius: 6,
  borderColor: colors["light-gray"],
  borderWidth: 1,
  padding: 8,
  backgroundColor: colors["white"],
});

const ItemInfo = styled(YStack, {
  marginLeft: 12,
  justifyContent: "space-between", //flex-start
  minHeight: 100,
  width: "61%", //65%
});

const ItemInfoName = styled(Text, {
  paddingTop: 4,
  paddingBottom: 7,
  ...typography["heading-16"],
});

export default function AdsItem(data: UserType | AdType) {
  const isMusician = "surname" in data;

  const genres = useMemo(
    () => (isMusician ? data.musical_genres.slice(0, 3) : []),
    [data]
  );

  const cardImage = useMemo(
    () => (isMusician ? data.photo?.[0] : data.images?.[0]) || null,
    [data]
  );

  return (
    <Link
      asChild
      href={{
        pathname: "/details/[id]",
        params: { id: data.id },
      }}
    >
      <ItemContainer>
        <RateBlock
          reviewData={data.rate}
          screenType="list"
        />
        <CommonImage
          source={cardImage}
          width={96}
          height={96}
          resizeMode="cover"
          borderRadius={6}
        />
        <ItemInfo>
          <ProfileLocation address={data.address} />
          <ItemInfoName
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {isMusician ? `${data.name} ${data.surname}` : data.title}
          </ItemInfoName>
          {isMusician && genres.length > 0 && <GenresList genres={genres} />}
          {!isMusician && (
            <Text
              {...typography["paragraph-12"]}
              fontFamily="MulishSemiBold"
            >
              {data.description}
            </Text>
          )}
          <PricePerHour price={data.price_per_hour} />
        </ItemInfo>
      </ItemContainer>
    </Link>
  );
}
