import { useEvent } from "expo";
import { VideoView, useVideoPlayer } from "expo-video";
import { useCallback } from "react";
import { Stack, StackProps } from "tamagui";

export default function CommonVideo({
  source,
  local,
  ...props
}: {
  source?: string | null;
  local?: boolean;
} & StackProps) {
  const player = useVideoPlayer(
    {
      uri: local
        ? source || ""
        : process.env.EXPO_PUBLIC_SUPABASE_STORAGE + "/" + source,
    } || null,
    (player) => {
      player.loop = !!local;
    }
  );

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const onButtonPress = useCallback(() => {
    isPlaying ? player.pause() : player.play();
  }, [isPlaying, player]);

  return (
    <Stack
      width="100%"
      height={300}
      {...props}
      onPress={onButtonPress}
    >
      <VideoView
        style={{ width: "100%", height: "100%" }}
        player={player}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
        nativeControls={false}
      />
    </Stack>
  );
}
