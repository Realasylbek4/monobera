import { bgtClient } from "@bera/graphql";
import {
  GetSelectedValidator,
  type GetSelectedValidatorQuery,
} from "@bera/graphql/pol";
import { Address } from "viem";

import { type BeraConfig } from "~/types";

export const getSelectedValidator = async ({
  config,
  address,
}: {
  config: BeraConfig;
  address: Address;
}): Promise<GetSelectedValidatorQuery | undefined> => {
  try {
    if (!config.subgraphs?.polSubgraph) {
      throw new Error("pol subgraph uri is not found in config");
    }
    console.log("step3", address);
    const result = await bgtClient.query<GetSelectedValidatorQuery>({
      query: GetSelectedValidator,
      variables: { operator: address.toLowerCase() },
    });
    console.log("step4", result);
    return result.data;
  } catch (e) {
    console.error("getSelectedValidator:", e);
    return undefined;
  }
};
