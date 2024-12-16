import AdsItem from "@/components/screens/homescreen/ads-list/ads-item";
import { YStack } from "tamagui";

export default function AdsList() {
  const tmpdata = [
    {
      id: 6569061,
      adImage:
        "../../../assets/Mock/vendors/vendor2.png, ../../../assets/Mock/vendors/vendor1.png, ../../../assets/Mock/vendors/vendor3.png",
      userPricePerHour: 150,
      userCurrencyType: "$",
      adDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat ea commodo...",
      adDate: {
        milliseconds: 55800000,
        string: "Wednesday, Jun 29",
      },
      eventStart: {
        milliseconds: 55800000,
        string: "03:30pm",
      },
      eventEnd: {
        string: "06:30pm",
        milliseconds: 73800000,
      },
      adTitle: "Downtown Aloft Asheville ",
      adLocation:
        "1443 Milvia Street, Berkeley, CA 94709 Berkeley California United States",
      coordinate: {
        latitude: 39.75513651827062,
        longitude: -104.94993048125623,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
      willingToTravel: true,
      adTypeOfMusician: "Band",

      adSkills: {
        singByEar: true,
        playByEar: true,
        readSheetMusic: true,
      },
      adGenres: ["Classical", "Jazz", "Pop"],
      adMusicalInstrument: ["Harp", "Piano"],
      adReview: [
        {
          reviewDate: 1652541822755,
          reviewRate: 2,
          reviewWritter: "Kelvin Pearson",
          reviewerAvatar: "../../../assets/Mock/reviewer/reviewer1.png",
          reviewMessage:
            "What a fabulous night for my Dad’s birthday – everyone was so impressed, he was outstanding. Neil was professional, adaptable and sociable. I would recommend him 100%. Brilliant!",
        },
      ],
    },
  ];
  return (
    <YStack
      marginTop={16}
      width="100%"
    >
      {tmpdata.map((data) => (
        <AdsItem {...data} />
      ))}
    </YStack>
  );
}
