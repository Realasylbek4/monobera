import { POLLING } from "@bera/shared-ui/src/utils";
import useSWR from "swr";
import { type PoolV2 } from "~/app/pools/fetchPools";
import { useCrocPool } from "./useCrocPool";
import useSWRImmutable from "swr/immutable";

export const useCrocPoolSpotPrice = (pool: PoolV2 | undefined) => {
  const crocPool = useCrocPool(pool);
  const QUERY_KEY = [crocPool, pool];
  useSWR(
    QUERY_KEY,
    async () => {
      if (!crocPool || !pool) {
        return undefined;
      }

      return await crocPool.spotPricePoolIdx(pool.poolIdx);
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const usePoolSpotPrice = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    usePoolSpotPrice,
  };
};