import { AdType, LocationType, UserType } from "@/lib/types";
import { toggleToast } from "@/lib/utils/toast";
import * as Location from "expo-location";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList } from "react-native";
import MapView from "react-native-maps";

export default function useMap(data: Array<AdType | UserType>) {
  const [currentLocation, setCurrentLocation] = useState<
    LocationType | undefined
  >();

  const mapRef = useRef<MapView>(null);
  const mapListRef = useRef<FlatList>(null);

  const currentLoc = useMemo(
    () =>
      currentLocation &&
      data?.find(
        (d) => JSON.stringify(d.location) === JSON.stringify(currentLocation)
      ),
    [currentLocation, data]
  );

  const onIndexChange = useCallback(
    (num: number) => {
      const current = data?.[num];
      current && setCurrentLocation(current.location);
    },
    [data]
  );

  const onMarkerPress = useCallback((num: number) => {
    mapListRef.current?.scrollToIndex({
      animated: true,
      index: num,
    });
  }, []);

  const animateCamera = useCallback((location: LocationType) => {
    mapRef.current?.animateToRegion(
      { ...location, latitudeDelta: 1.02, longitudeDelta: 10.2 },
      500
    );
  }, []);

  const getUserLocation = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return toggleToast("Permission to access location was denied", "error");
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
    animateCamera({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0,
    });
  }, [animateCamera]);

  useEffect(() => {
    if (currentLoc) {
      animateCamera(currentLoc.location);
    }
  }, [currentLoc, animateCamera]);

  return {
    currentLocation,
    mapListRef,
    mapRef,
    getUserLocation,
    onIndexChange,
    onMarkerPress,
    setCurrentLocation,
    animateCamera,
  };
}
