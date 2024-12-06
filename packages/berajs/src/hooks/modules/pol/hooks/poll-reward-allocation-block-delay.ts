import useSWR, { mutate } from "swr";
import { usePublicClient } from "wagmi";

import { getRewardAllocationBlockDelay } from "~/actions/pol";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types";

export const usePollRewardAllocationBlockDelay = (
  options?: DefaultHookOptions,
): DefaultHookReturnType<bigint | undefined> => {
  const { config: beraConfig } = useBeraJs();
  const publicClient = usePublicClient();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePollRewardAllocationBlockDelay"];

  const swrResponse = useSWR<bigint | undefined>(
    QUERY_KEY,
    async () => {
      if (!publicClient) throw new Error("publicClient is not defined");
      if (!config) throw new Error("missing beraConfig");
      return await getRewardAllocationBlockDelay({
        config,
        client: publicClient,
      });
    },
    {
      ...options?.opts,
    },
  );

  return {
    ...swrResponse,
    refresh: () => mutate(QUERY_KEY),
  };
};
