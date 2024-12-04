"use client";

import { Suspense } from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";

import Data from "~/components/data";
import { HoneyChart } from "~/components/honey-chart";
import HoneyPage from "~/components/honey-page";
import HoneyTransactionsTable from "~/components/honey-transactions-table";
import { LoadingBee } from "~/components/loadingBee";

export default function Page() {
  return (
    <Suspense fallback={<LoadingBee />}>
      <Content />
    </Suspense>
  );
}

const Content = () => {
  return (
    <div className="bg-backgroundSecondary font-honey">
      <HoneyPage />
      <div className="bg-gradient-to-b from-backgroundSecondary text-foregroundSecondary xl:to-background">
        <div className="container max-w-[1200px]">
          <Data />
          <div className="py-4">
            <h3 className="mb-4 flex items-center gap-3 text-lg text-foregroundSecondary md:text-3xl">
              <Image
                src={`${cloudinaryUrl}/honey/qqyo5g3phzdwezvazsih`}
                className="w-8"
                alt="honey"
                width={32}
                height={32}
              />
              Total Honey Supply & Volume
            </h3>
            <HoneyChart />
          </div>
          <HoneyTransactionsTable />
        </div>
      </div>
    </div>
  );
};
