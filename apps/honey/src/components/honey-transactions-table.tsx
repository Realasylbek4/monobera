"use client";

import { useState } from "react";
// import { DataTable } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

// import { transaction_history_columns } from "~/utils/columns";
import { EventTable } from "~/components/event-table";
import { useHoneyEvents } from "~/hooks/useHoneyEvents";

enum Selection {
  AllTransactions = "allTransactions",
  Mints = "mints",
  Burns = "burns",
}

export interface MappedTokens {
  [key: string]: number;
}

export default function HoneyTransactionsTable() {
  const [selectedTab, setSelectedTab] = useState(Selection.AllTransactions);
  const {
    allData,
    allDataSize,
    isAllDataLoadingMore,
    isAllDataReachingEnd,
    setAllDataSize,
    mintData,
    mintDataSize,
    isMintDataLoadingMore,
    isMintDataReachingEnd,
    setMintDataSize,
    redemptionData,
    redemptionDataSize,
    isRedemptionDataLoadingMore,
    isRedemptionDataReachingEnd,
    setRedemptionDataSize,
  } = useHoneyEvents();

  const getLoadMoreButton = () => {
    if (selectedTab === Selection.AllTransactions) {
      return (
        <Button
          onClick={() => setAllDataSize(allDataSize + 1)}
          disabled={isAllDataLoadingMore || isAllDataReachingEnd}
          variant="outline"
        >
          {isAllDataLoadingMore
            ? "Loading..."
            : isAllDataReachingEnd
              ? "No more transactions"
              : "Load more"}
        </Button>
      );
    }
    if (selectedTab === Selection.Mints) {
      return (
        <Button
          onClick={() => setMintDataSize(mintDataSize + 1)}
          disabled={isMintDataLoadingMore || isMintDataReachingEnd}
          variant="outline"
        >
          {isMintDataLoadingMore
            ? "Loading..."
            : isMintDataReachingEnd
              ? "No more transactions"
              : "Load more"}
        </Button>
      );
    }
    if (selectedTab === Selection.Burns) {
      return (
        <Button
          onClick={() => setRedemptionDataSize(redemptionDataSize + 1)}
          disabled={isRedemptionDataLoadingMore || isRedemptionDataReachingEnd}
          variant="outline"
        >
          {isRedemptionDataLoadingMore
            ? "Loading..."
            : isRedemptionDataReachingEnd
              ? "No more transactions"
              : "Load more"}
        </Button>
      );
    }
  };

  return (
    <section id="transactions">
      <Tabs
        defaultValue={Selection.AllTransactions}
        onValueChange={(value: string) => setSelectedTab(value as Selection)}
      >
        <TabsList className="w-full rounded-md border-2 border-dashed border-blue-900 bg-blue-50">
          <TabsTrigger
            value={Selection.AllTransactions}
            className="w-full text-xs text-stone-700  sm:text-sm data-[state=active]:bg-red-600"
          >
            🧾 All txns
          </TabsTrigger>
          <TabsTrigger
            value={Selection.Mints}
            className="w-full text-xs text-stone-700  sm:text-sm data-[state=active]:bg-red-600"
          >
            🪙 Mints
          </TabsTrigger>
          <TabsTrigger
            value={Selection.Burns}
            className="w-full text-xs text-stone-700  sm:text-sm data-[state=active]:bg-red-600"
          >
            🔥 Redeems
          </TabsTrigger>
        </TabsList>
        <div className="mt-4 overflow-hidden rounded-md border border-blue-300 bg-blue-50">
          <TabsContent value={Selection.AllTransactions} className="mt-0">
            {/* <DataTable
              columns={transaction_history_columns}
              data={allData ?? []}
            /> */}
            <EventTable events={allData} isLoading={isAllDataLoadingMore} />
          </TabsContent>
          <TabsContent value={Selection.Mints} className="mt-0">
            {/* <DataTable
              columns={transaction_history_columns}
              data={mintData ?? []}
            /> */}
            <EventTable events={mintData} isLoading={isMintDataLoadingMore} />
          </TabsContent>
          <TabsContent value={Selection.Burns} className="mt-0">
            {/* <DataTable
              columns={transaction_history_columns}
              data={redemptionData ?? []}
            /> */}
            <EventTable
              events={redemptionData}
              isLoading={isRedemptionDataLoadingMore}
            />
          </TabsContent>
        </div>
        <div className="mt-4 flex justify-center mb-16">
          {getLoadMoreButton()}
        </div>
      </Tabs>
    </section>
  );
}
