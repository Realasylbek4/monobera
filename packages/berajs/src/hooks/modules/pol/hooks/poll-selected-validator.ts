import { type GetSelectedValidatorQuery } from "@bera/graphql/pol";
import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { Address } from "viem";

import { getSelectedValidator } from "~/actions/pol";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types";

export const usePollSelectedValidator = (
  address: Address,
  options?: DefaultHookOptions,
): DefaultHookReturnType<GetSelectedValidatorQuery | undefined> => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePollSelectedValidator", address];

  const swrResponse = useSWRImmutable<GetSelectedValidatorQuery | undefined>(
    QUERY_KEY,
    async () => {
      if (!address) {
        throw new Error(
          "usePollSelectedValidator needs a valid validator address",
        );
      }
      return await getSelectedValidator({ config, address: address });
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
