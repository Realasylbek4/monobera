import {
  beraChefAddress,
  bgtTokenAddress,
  depositContractAddress,
} from "@bera/config";
import useSWR from "swr";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import { BERA_CHEF_ABI, BGT_ABI, beaconDepositAbi } from "~/abi";
import { Validator } from "~/types";

export const useOnChainValidator = ({ pubkey }: { pubkey: Address }) => {
  const publicClient = usePublicClient();
  const QUERY_KEY = pubkey ? ["useOnChainValidator", pubkey] : null;

  return useSWR<Partial<Validator> | undefined, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => {
      const [operator, depositCount, boostees, rewardAllocation] =
        await Promise.all([
          publicClient?.readContract({
            address: depositContractAddress,
            abi: beaconDepositAbi,
            functionName: "getOperator",
            args: [pubkey],
          }),
          undefined,
          publicClient?.readContract({
            address: bgtTokenAddress,
            abi: BGT_ABI,
            functionName: "boostees",
            args: [pubkey],
          }),
          publicClient?.readContract({
            address: beraChefAddress,
            abi: BERA_CHEF_ABI,
            functionName: "getActiveRewardAllocation",
            args: [pubkey],
          }),
        ]);

      console.log({ operator, depositCount, boostees, rewardAllocation });

      return {
        id: pubkey,
        coinbase: pubkey,
        amountStaked: "0",
        operator,
        votingPower: Number(boostees),
        activeIncentives: [],
        cuttingBoard: rewardAllocation,
      } as Partial<Validator>;
    },
  );
};
