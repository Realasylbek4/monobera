import React, { KeyboardEvent } from "react";
import { Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { useLocalStorage } from "usehooks-ts";

import {
  DEFAULT_DEADLINE,
  DEFAULT_SLIPPAGE,
  DEFAULT_SOUND_ENABLED,
  LOCAL_STORAGE_KEYS,
  MAX_INPUT_DEADLINE,
} from "~/utils/constants";

export enum SELECTION {
  AUTO = "auto",
  CUSTOM = "custom",
  DEGEN = "degen",
  INFINITY = "infinity",
}

export default function SwapSettings({
  showDeadline = true,
}: {
  showDeadline?: boolean;
}) {
  const [slippageToleranceType, setSlippageToleranceType] = useLocalStorage<
    number | string
  >(LOCAL_STORAGE_KEYS.SLIPPAGE_TOLERANCE_TYPE, SELECTION.AUTO);

  const [slippageToleranceValue, setSlippageToleranceValue] = useLocalStorage<
    number | string
  >(LOCAL_STORAGE_KEYS.SLIPPAGE_TOLERANCE_VALUE, DEFAULT_SLIPPAGE);

  const [deadlineType, setDeadlineType] = useLocalStorage<number | string>(
    LOCAL_STORAGE_KEYS.DEADLINE_TYPE,
    SELECTION.AUTO,
  );

  const [deadlineValue, setDeadlineValue] = useLocalStorage<number | string>(
    LOCAL_STORAGE_KEYS.DEADLINE_VALUE,
    DEFAULT_DEADLINE,
  );

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="flex items-center gap-1 font-medium leading-none">
          Slippage tolerance
          <Tooltip text="Maximum amount of slippage that can occur during a swap" />
        </h4>
      </div>
      <div className="flex h-[40px] w-full items-center justify-between gap-4">
        <Tabs
          className="flex-shrink-0"
          defaultValue={slippageToleranceType as string}
          onValueChange={(value: string) => setSlippageToleranceType(value)}
        >
          <TabsList variant="ghost">
            <TabsTrigger value={SELECTION.AUTO} variant="ghost">
              Auto
            </TabsTrigger>
            <TabsTrigger value={SELECTION.CUSTOM} variant="ghost">
              Custom
            </TabsTrigger>
            <TabsTrigger
              value={SELECTION.DEGEN}
              variant="ghost"
              className={cn(
                slippageToleranceType === SELECTION.DEGEN &&
                  "data-[state=active]:bg-destructive-foreground",
              )}
            >
              Degen
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {
          <Input
            type="number"
            step="any"
            min={0.1}
            max={100}
            className="h-[40px] pr-8 text-right"
            disabled={slippageToleranceType !== SELECTION.CUSTOM}
            placeholder="1"
            value={
              slippageToleranceType === SELECTION.AUTO
                ? DEFAULT_SLIPPAGE
                : slippageToleranceValue
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              e.key === "-" && e.preventDefault()
            }
            endAdornment={
              <p
                className={cn(
                  "mr-2 self-center text-xs text-foreground",
                  slippageToleranceType === SELECTION.AUTO && "opacity-50",
                )}
              >
                %
              </p>
            }
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
              const value = parseFloat(e.target.value);
              if (value > 100) {
                setSlippageToleranceValue(100);
              } else if (value < 0.1) {
                setSlippageToleranceValue(0.1);
              }
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSlippageToleranceValue(Number(e.target.value));
            }}
          />
        }
      </div>
      {slippageToleranceType === "degen" && (
        <Alert variant={"destructive"} className="flex gap-2">
          <Icons.info className="h-4 w-4 flex-shrink-0 text-destructive-foreground" />
          <div>
            <AlertTitle>Extremely High slippage</AlertTitle>
            <AlertDescription className="text-xs">
              Please be aware this could result in extremely high slippage
              (i.e., A swap could cost you 50% or more)
            </AlertDescription>
          </div>
        </Alert>
      )}
      {showDeadline && (
        <>
          <div className="space-y-2">
            <h4 className="flex items-center gap-1 font-medium leading-none">
              Transaction Deadline
              <Tooltip text="Maximum amount of time that can elapse during a swap" />
            </h4>
          </div>
          <div className="flex h-[40px] flex-row items-center gap-4">
            <Tabs
              defaultValue={deadlineType as string}
              onValueChange={(value: string) => setDeadlineType(value)}
            >
              <TabsList variant="ghost" className="flex-shrink-0">
                <TabsTrigger variant="ghost" value={SELECTION.AUTO}>
                  Auto
                </TabsTrigger>
                <TabsTrigger variant="ghost" value={SELECTION.CUSTOM}>
                  Custom
                </TabsTrigger>
                <TabsTrigger
                  variant="ghost"
                  value={SELECTION.INFINITY}
                  className={cn(
                    deadlineType === SELECTION.INFINITY &&
                      "data-[state=active]:bg-destructive-foreground",
                  )}
                >
                  Infinity
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Input
              type="number"
              step="any"
              className={cn(
                "h-[40px] pl-1 pr-9",
                deadlineType === SELECTION.INFINITY
                  ? "text-center"
                  : "text-right",
              )}
              disabled={deadlineType !== SELECTION.CUSTOM}
              placeholder={deadlineType === SELECTION.INFINITY ? "∞" : ""}
              value={
                deadlineType === SELECTION.AUTO
                  ? DEFAULT_DEADLINE
                  : deadlineType === SELECTION.INFINITY
                    ? ""
                    : deadlineValue
              }
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                e.key === "-" && e.preventDefault()
              }
              endAdornment={
                <p
                  className={cn(
                    "ml-2 self-center pl-1 text-xs text-foreground",
                    deadlineType === SELECTION.AUTO && "opacity-50",
                  )}
                >
                  sec
                </p>
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                let value = Number(e.target.value);
                if (value < 0.1) value = 0.1;
                if (value > MAX_INPUT_DEADLINE) value = MAX_INPUT_DEADLINE;
                setDeadlineValue(value);
              }}
            />
          </div>
          {deadlineType === SELECTION.INFINITY && (
            <Alert variant={"destructive"} className="flex gap-2">
              <Icons.info className="h-4 w-4 flex-shrink-0 text-destructive-foreground" />
              <div>
                <AlertTitle>No Txn Deadline</AlertTitle>
                <AlertDescription className="text-xs">
                  Please be aware this could result in the txn being active
                  forever.
                </AlertDescription>
              </div>
            </Alert>
          )}
        </>
      )}
    </div>
  );
}
