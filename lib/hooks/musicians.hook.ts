import { QUERY_TAGS } from "@/lib/constants";
import UsersServiceClass from "@/lib/services/user";
import { useQuery } from "@tanstack/react-query";

type useMusiciansParams = {
  enabled?: boolean;
  id?: string;
};

const useMusicians = ({ enabled = true, id }: useMusiciansParams) => {
  const { data: musicians } = useQuery({
    queryKey: [QUERY_TAGS.MUSICIAN, id ? "SIMILAR" : undefined],
    queryFn: () => UsersServiceClass.getMusicians(id),
    enabled,
  });
  return { musicians };
};

export default useMusicians;
