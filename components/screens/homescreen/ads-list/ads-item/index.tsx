// import MapPointIcon from "@/assets/images/icon/map_point_icon.svg";
// import Logo from "@/assets/images/splash.png";
import RateBlock from "@/components/rate-block";
import { AdType, UserType } from "@/lib/types";
import { generateImagesList } from "@/lib/utils";
import { colors, typography } from "@/tamagui.config";
import { Link } from "expo-router";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { Stack, Text, XStack, YStack, styled } from "tamagui";

const ItemContainer = styled(TouchableOpacity, {
  width: "100%",
  borderRadius: 6,
  borderColor: colors["light-gray"],
  borderWidth: 1,
  padding: 8,
  backgroundColor: colors["white"],
});

const ItemImageBlock = styled(Stack, {
  borderRadius: 6,
  width: 105,
  height: 105,
  overflow: "hidden",
});

const ItemInfo = styled(YStack, {
  marginLeft: 12,
  justifyContent: "space-between", //flex-start
  minHeight: 100,
  width: "61%", //65%
});

const ItemInfoLocation = styled(XStack, {
  alignItems: "center",
  paddingRight: 75,
});

const ItemInfoLocationText = styled(Text, {
  marginLeft: 5,
  color: colors["s-black"],
});

const ItemInfoName = styled(Text, {
  paddingTop: 4,
  paddingBottom: 7,
  ...typography["heading-16"],
});

const ItemInfoGenres = styled(XStack, {
  width: "100%",
  flexWrap: "wrap",
  maxHeight: 33,
  overflow: "hidden",
});

const ItemInfoGenre = styled(XStack, {
  paddingHorizontal: 8,
  paddingBottom: 3,
  borderColor: colors["black"],
  borderWidth: 1,
  borderRadius: 20,
  marginRight: 8,
  justifyContent: "center",
  alignItems: "center",
});

const ItemInfoCost = styled(XStack, {
  justifyContent: "flex-end",
});

const ItemInfoCostValue = styled(Text, {
  marginRight: 5,
  ...typography["heading-18"],
});

const ItemInfoCostValuePostfix = styled(XStack, {
  marginRight: 2,
  ...typography["paragraph-14"],
});

export default function AdsItem(data: UserType | AdType) {
  const isMusician = "userFirstName" in data;

  const genres = useMemo(
    () => (isMusician ? data.userGenres.slice(0, 3) : []),
    [data]
  );

  const cardImages = useMemo(
    () => generateImagesList(isMusician ? data.userAvatar : data.adImage),
    [data]
  );

  const currencyType = useMemo(
    () => data.userCurrencyType.split("-")[1],
    [data]
  );

  console.log(isMusician ? data.userReview : data.adReview);
  return (
    <Link
      asChild
      href={"/"}
    >
      <ItemContainer activeOpacity={1}>
        <RateBlock
          reviewData={isMusician ? data.userReview : data.adReview}
          screenType="list"
        />

        {/* <ItemImageBlock>
          <Image
            source={cardImages.length ? { uri: cardImages[0] } : Logo}
            resizeMode="cover"
          />
        </ItemImageBlock>

        <ItemInfo>
          <ItemInfoLocation>
            <MapPointIcon
              width={8}
              height={12}
            />

            <ItemInfoLocationText
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {isMusician ? data.userLocation : data.adLocation}
            </ItemInfoLocationText>
          </ItemInfoLocation>

          <ItemInfoName
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {isMusician
              ? `${data.userFirstName} ${data.userLastName}`
              : data.adTitle}
          </ItemInfoName>
          {"userGenres" in data && (
            <ItemInfoGenres>
              {genres.map((genre: string) => (
                <ItemInfoGenre key={genre}>
                  <Text>{genre.toLowerCase()}</Text>
                </ItemInfoGenre>
              ))}
            </ItemInfoGenres>
          )}
          <ItemInfoCost>
            <ItemInfoCostValue>
              {currencyType}
              {data.userPricePerHour}
            </ItemInfoCostValue>
            <ItemInfoCostValuePostfix>/ hour</ItemInfoCostValuePostfix>
          </ItemInfoCost>
        </ItemInfo> */}
      </ItemContainer>
    </Link>
  );
}
