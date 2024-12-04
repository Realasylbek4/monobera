import { useState } from "react";
import { RateProvider, getSafeNumber } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { InputWithLabel } from "@bera/ui/input";

type Props = {
  rateProviders: Record<`0x${string}`, RateProvider>;
  handleRateProviderChange: (
    tokenAddress: `0x${string}`,
    update: Partial<RateProvider>,
  ) => void;
  disabled: boolean;
};

export default function RateProviderInputs({
  rateProviders,
  handleRateProviderChange,
  disabled,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  // FIXME useDropdown component properly here
  return (
    <section
      className={cn("flex w-full flex-col gap-4", disabled && "opacity-50")}
      title={disabled ? "You must select tokens to set rate providers" : ""}
    >
      <div className="flex flex-row space-x-2">
        <h2 className="self-start text-3xl font-semibold">Rate Providers</h2>
        {isExpanded && !disabled ? (
          <button type="button" onClick={() => setIsExpanded(false)}>
            Collapse
          </button>
        ) : (
          <button type="button" onClick={() => setIsExpanded(true)}>
            Expand
          </button>
        )}
      </div>
      {isExpanded && !disabled && (
        <div className="flex w-full flex-col space-y-2">
          {Object.entries(rateProviders).map(([_, rateProvider]) => {
            return (
              <>
                <h3>{rateProvider.tokenSymbol}</h3>
                <InputWithLabel
                  label="Address"
                  disabled={false}
                  value={rateProvider.providerAddress}
                  onChange={(e) => {
                    handleRateProviderChange(rateProvider.tokenAddress, {
                      providerAddress: e.target.value as `0x${string}`, // NOTE: we verify this and set an error in the parent
                    });
                  }}
                />
                <InputWithLabel
                  label="Cache Duration"
                  disabled={false}
                  value={rateProvider.cacheDuration}
                  onChange={(e) => {
                    if (
                      e.target.value &&
                      !Number.isNaN(Number(e.target.value))
                    ) {
                      handleRateProviderChange(rateProvider.tokenAddress, {
                        cacheDuration: getSafeNumber(e.target.value),
                      });
                    }
                  }}
                />
                {rateProvider.error && (
                  <Alert variant="destructive" className="my-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{rateProvider.error}</AlertDescription>
                  </Alert>
                )}
              </>
            );
          })}
        </div>
      )}
    </section>
  );
}
