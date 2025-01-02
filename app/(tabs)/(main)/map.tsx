import FilterDialog from "@/components/dialogs/filter-dialog";
import InfoDialog from "@/components/dialogs/info-dialog";
import LocationSearch from "@/components/location-search";
import LocationsProvider from "@/components/providers/locations-provider";
import MapList from "@/components/screens/map/map-list";
import MapMarkers from "@/components/screens/map/map-markers";
import { Button } from "@/components/ui";
import { SCREEN_WIDTH } from "@/lib/constants";
import useMap from "@/lib/hooks/map.hook";
import useSearch from "@/lib/hooks/search.hook";
import { PredictionType } from "@/lib/types";
import { colors } from "@/tamagui.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChevronLeft, Navigation, Search } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import MapView from "react-native-maps";
import { YStack } from "tamagui";

export default function Page() {
  const { data, isOpen, filters, onResetFilters, onFilterChange, setOpen } =
    useSearch();

  const {
    mapRef,
    mapListRef,
    currentLocation,
    getUserLocation,
    onMarkerPress,
    onIndexChange,
    animateCamera,
  } = useMap(data || []);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const onValueChange = useCallback(
    (item: PredictionType) => {
      animateCamera({
        latitude: item.properties.lat,
        longitude: item.properties.lon,
        latitudeDelta: 0,
        longitudeDelta: 0,
      });
      onFilterChange("address", item.properties.formatted);
    },
    [animateCamera, onFilterChange]
  );

  useEffect(() => {
    AsyncStorage.getItem("map-dialog").then(async (res) => {
      if (!res) {
        await AsyncStorage.setItem("map-dialog", "true");
        setDialogOpen(true);
      }
    });
  }, []);
  return (
    <>
      <LocationsProvider
        coords={{ x: 0, y: 0 }}
        onValueChange={onValueChange}
        mode="dark"
      >
        <LocationSearch
          iconLeft={<ChevronLeft onPress={() => router.back()} />}
          placeholder="NearBy"
          backgroundColor={colors["main"]}
          shadowOffset={{ width: 0, height: 0 }}
          shadowOpacity={0.2}
          shadowRadius={10}
          position="absolute"
          left={16}
          top={64}
          width={SCREEN_WIDTH - 32}
          zIndex={isOpen ? 0 : 200_000}
          onFilter={() => setOpen(true)}
        />
        <YStack flexGrow={1}>
          <MapView
            ref={mapRef}
            showsScale
            zoomControlEnabled
            zoomEnabled
            zoomTapEnabled
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <MapMarkers
              data={data || []}
              currentLocation={currentLocation}
              onMarkerPress={onMarkerPress}
            />
          </MapView>
          <Button
            variant="dark"
            sizeB="icon"
            position="absolute"
            bottom={200}
            right={16}
            onPress={getUserLocation}
          >
            <Navigation color={colors["main"]} />
          </Button>
          <MapList
            mapListRef={mapListRef}
            zIndex={isOpen ? 0 : 200}
            data={data || []}
            onIndexChange={onIndexChange}
          />
        </YStack>
      </LocationsProvider>

      <FilterDialog
        open={isOpen}
        selectedFilters={filters}
        totalCount={data?.length || 0}
        onFilterChange={onFilterChange}
        resetFilters={onResetFilters}
        hideAddress
        onOpenChange={() => setOpen(false)}
      />
      <InfoDialog
        icon={
          <Search
            size={80}
            color={colors["dodger-blue"]}
            strokeWidth={4}
          />
        }
        title="Performer finder"
        description="This is an approximate location of the performer. Contact directly to find out more"
        buttonText="Continue"
        open={isDialogOpen}
        onOpenChange={() => setDialogOpen(false)}
      />
    </>
  );
}
