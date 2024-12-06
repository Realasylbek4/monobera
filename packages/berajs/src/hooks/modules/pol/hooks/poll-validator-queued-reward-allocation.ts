import useSWR, { mutate } from "swr";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import {
  ValidatorQueuedRewardAllocation,
  getValidatorQueuedRewardAllocation,
} from "~/actions/pol";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types";

export const usePollValidatorQueuedRewardAllocation = (
  pubKey: Address,
  options?: DefaultHookOptions,
): DefaultHookReturnType<ValidatorQueuedRewardAllocation | undefined> => {
  const { config: beraConfig } = useBeraJs();
  const publicClient = usePublicClient();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePollValidatorQueuedRewardAllocation", pubKey];

  const swrResponse = useSWR<ValidatorQueuedRewardAllocation | undefined>(
    QUERY_KEY,
    async () => {
      if (!publicClient) throw new Error("publicClient is not defined");
      if (!config) throw new Error("missing beraConfig");
      if (!pubKey) {
        throw new Error(
          "usePollValidatorQueuedRewardAllocation needs a valid validator public key",
        );
      }
      return await getValidatorQueuedRewardAllocation({
        config,
        client: publicClient,
        pubKey: pubKey,
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
