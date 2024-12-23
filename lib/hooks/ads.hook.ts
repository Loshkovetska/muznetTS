import { QUERY_TAGS } from "@/lib/constants";
import AdService from "@/lib/services/ad";
import { AdType, AddUpdateAdRequestType } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

type useMusiciansParams = {
  enabled?: boolean;
  id?: string;
  user_id?: string;
  onSuccess?: () => void;
};

const useAds = ({
  enabled = true,
  id,
  user_id,
  onSuccess,
}: useMusiciansParams) => {
  const queryClient = useQueryClient();
  const { data: ads } = useQuery({
    queryKey: [QUERY_TAGS.AD, id ? "SIMILAR" : undefined, user_id],
    queryFn: () => AdService.getAds({ id, user_id }),
    enabled,
  });

  const { mutate: addAd, isPending: isAddPending } = useMutation({
    mutationFn: (params: AddUpdateAdRequestType) => AdService.addAd(params),
    onSuccess: (data) => {
      queryClient.setQueryData(
        [QUERY_TAGS.AD, id ? "SIMILAR" : undefined, user_id],
        (old: AdType[]) => [...old, data]
      );
      onSuccess?.();
    },
    onError: () => Alert.alert("Can't create an ad"),
  });

  const { mutate: updateAd, isPending: isUpdatePending } = useMutation({
    mutationFn: (params: AddUpdateAdRequestType) => AdService.updatedAd(params),
    onSuccess: (data) => {
      queryClient.setQueryData(
        [QUERY_TAGS.AD, id ? "SIMILAR" : undefined, user_id],
        (old: AdType[]) => old.map((ad) => (ad.id === data.id ? data : ad))
      );
      onSuccess?.();
    },
    onError: () => Alert.alert("Can't update the ad"),
  });

  const { mutate: deleteAd, isPending: isDeletePending } = useMutation({
    mutationFn: (id: string) => AdService.deleteAd(id),
    onSuccess: (_, vars) => {
      queryClient.setQueryData(
        [QUERY_TAGS.AD, id ? "SIMILAR" : undefined, user_id],
        (old: AdType[]) => old.filter((ad) => ad.id !== vars)
      );
      onSuccess?.();
    },
    onError: () => Alert.alert("Can't delete the ad"),
  });

  return {
    ads,
    addAd,
    updateAd,
    deleteAd,
    isAddPending,
    isUpdatePending,
    isDeletePending,
  };
};

export default useAds;
