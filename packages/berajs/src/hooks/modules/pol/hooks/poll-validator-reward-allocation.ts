import useSWR, { mutate } from "swr";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import {
  ValidatorRewardAllocation,
  getValidatorRewardAllocation,
} from "~/actions/pol/get-validator-reward-allocation";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types";

export const usePollValidatorRewardAllocation = (
  pubKey: Address,
  options?: DefaultHookOptions,
): DefaultHookReturnType<ValidatorRewardAllocation | undefined> => {
  const { config: beraConfig } = useBeraJs();
  const publicClient = usePublicClient();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePollValidatorRewardAllocation", pubKey];

  const swrResponse = useSWR<ValidatorRewardAllocation | undefined>(
    QUERY_KEY,
    async () => {
      if (!publicClient) throw new Error("publicClient is not defined");
      if (!config) throw new Error("missing beraConfig");
      if (!pubKey) {
        throw new Error(
          "usePollValidatorRewardAllocation needs a valid validator public key",
        );
      }
      return await getValidatorRewardAllocation({
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
