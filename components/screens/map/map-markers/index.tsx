import { AdType, LocationType, UserType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { Marker } from "react-native-maps";
import { Text, YStack } from "tamagui";

type MapMarkersPropType = {
  data: Array<UserType | AdType>;
  currentLocation?: LocationType;
  onMarkerPress: (id: number) => void;
};

export default function MapMarkers({
  data,
  currentLocation,
  onMarkerPress,
}: MapMarkersPropType) {
  return data?.map((item, ind) => {
    const isSelected =
      JSON.stringify(currentLocation) === JSON.stringify(item.location);
    return (
      <Marker
        coordinate={item.location}
        onPress={() => onMarkerPress(ind)}
        key={item.id}
      >
        <YStack
          backgroundColor={colors[isSelected ? "black" : "white"]}
          borderRadius={16}
          paddingHorizontal={16}
          paddingVertical={6}
          alignItems="center"
          justifyContent="center"
        >
          <Text
            {...typography["heading-15"]}
            color={colors[isSelected ? "white" : "black"]}
          >
            ${item.price_per_hour}
          </Text>
        </YStack>
      </Marker>
    );
  });
}
