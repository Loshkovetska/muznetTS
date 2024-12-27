// import Button from "@/components/ui/button";
// import { Play } from "@tamagui/lucide-icons";
import { useVideoPlayer, VideoView } from "expo-video";
import { Stack, StackProps } from "tamagui";

export default function CommonVideo({
  source,
  ...props
}: {
  source?: string | { uri: string } | null;
} & StackProps) {
  const player = useVideoPlayer(source || "", (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <Stack
      width="100%"
      height={300}
      {...props}
    >
      <VideoView
        player={player}
        style={{ width: "100%", height: "100%" }}
      />
      {/* <Button
        variant="white"
        sizeB="icon-sm"
        position="absolute"
      >
        <Play size={16} />
      </Button> */}
    </Stack>
  );
}
