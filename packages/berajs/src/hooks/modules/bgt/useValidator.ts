import { Address } from "viem";

import { Validator } from "~/types";
import { useOnChainValidator } from "./useOnChainValidator";
import { useSelectedValidator } from "./useSelectedValidator";

export const useValidator = ({ pubkey }: { pubkey: Address }) => {
  const {
    data: indexerValidator,
    isLoading: isIndexerValidatorLoading,
    error: indexerValidatorError,
  } = useSelectedValidator(pubkey);

  const {
    data: onChainValidator,
    isLoading: isOnChainValidatorLoading,
    error: onChainValidatorError,
  } = useOnChainValidator({ pubkey });

  return {
    data:
      indexerValidator || onChainValidator
        ? ({
            ...indexerValidator,
            ...onChainValidator,
          } as Validator)
        : null,
    isLoading: isIndexerValidatorLoading || isOnChainValidatorLoading,
    error: indexerValidatorError || onChainValidatorError,
  };
};
