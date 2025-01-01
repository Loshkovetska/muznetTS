import Button from "@/components/ui/button";
import VideoTime from "@/components/video-time";
import { colors } from "@/tamagui.config";
import { Volume2, VolumeX } from "@tamagui/lucide-icons";
import { useEvent, useEventListener } from "expo";
import { BlurView } from "expo-blur";
import { VideoContentFit, VideoView, useVideoPlayer } from "expo-video";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Stack, StackProps } from "tamagui";

type CommonVideoPropType = {
  source?: string | null;
  local?: boolean;
  postView?: boolean;
  inView?: boolean;
  contentFit?: VideoContentFit;
  timeVariant?: "absolute-right" | "absolute-right-bottom";
} & StackProps;

export default function CommonVideo({
  source,
  local,
  postView,
  inView,
  contentFit = "contain",
  timeVariant = "absolute-right",
  ...props
}: CommonVideoPropType) {
  const [currentTime, setCurrentTime] = useState(0);
  const uri = local
    ? source || ""
    : process.env.EXPO_PUBLIC_SUPABASE_STORAGE + "/" + source;

  const player = useVideoPlayer(
    {
      uri,
    },
    (player) => {
      player.timeUpdateEventInterval = 1;
    }
  );

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const { muted } = useEvent(player, "mutedChange", {
    muted: player.muted,
  });

  useEventListener(player, "timeUpdate", (player) => {
    inView && setCurrentTime(player.currentTime);
  });

  const onButtonPress = useCallback(() => {
    isPlaying ? player.pause() : player.play();
  }, [isPlaying, player]);

  const onMute = useCallback(() => {
    player.muted = !muted;
  }, [player, muted]);

  const VolumeIcon = useMemo(() => (muted ? VolumeX : Volume2), [muted]);

  useEffect(() => {
    if (local || postView) {
      player.loop = true;
    }
  }, [local, postView]);

  useEffect(() => {
    if (postView) {
      inView ? player.play() : player.pause();
    }
  }, [postView, inView]);

  const time = useMemo(() => {
    if (inView) {
      const seconds = Math.floor(currentTime);
      return `00:${String(seconds).padStart(2, "0")}:00`;
    }
    return `00:${String(player.duration).padStart(2, "0")}:00`;
  }, [inView, currentTime, player.duration]);

  return (
    <Stack
      width="100%"
      height={300}
      {...props}
      onPress={
        postView && timeVariant === "absolute-right" ? undefined : onButtonPress
      }
      backgroundColor={postView ? colors["black"] : undefined}
    >
      {postView && (
        <VideoTime
          time={time}
          variant={timeVariant}
          bg="transparent"
          sizeB={timeVariant === "absolute-right" ? "sm" : "sm-12"}
        />
      )}
      <VideoView
        style={{ width: "100%", height: "100%" }}
        player={player}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
        nativeControls={false}
        contentFit={contentFit}
      />
      {postView && timeVariant === "absolute-right" && (
        <BlurView
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            zIndex: 1,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <Button
            variant="black/50"
            sizeB="icon-32"
            onPress={onMute}
          >
            <VolumeIcon
              color={colors["main"]}
              size={20}
            />
          </Button>
        </BlurView>
      )}
    </Stack>
  );
}
