import useSWRImmutable from "swr/immutable";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import { isBadCollateralAsset, isBadCollateralResponse } from "~/actions/honey";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types";

export interface UseIsBadCollateralResponse
  extends DefaultHookReturnType<isBadCollateralResponse | undefined> {}

export const useIsBadCollateralAsset = (
  { collateral }: { collateral: Address },
  options?: DefaultHookOptions,
): UseIsBadCollateralResponse => {
  const publicClient = usePublicClient();
  const method = "useIsBadCollateral";
  const QUERY_KEY = [method, collateral];
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;

  const swrResponse = useSWRImmutable(
    QUERY_KEY,
    async () => {
      if (!publicClient) throw new Error("publicClient is not defined");
      if (!config) throw new Error("missing beraConfig");
      if (!config.contracts?.honeyFactoryAddress)
        throw new Error("missing contract address honeyFactoryAddress");
      return await isBadCollateralAsset({
        client: publicClient,
        config,
        collateral,
      });
    },
    { ...options?.opts },
  );

  return {
    ...swrResponse,
    refresh: () => void swrResponse.mutate(),
  };
};
