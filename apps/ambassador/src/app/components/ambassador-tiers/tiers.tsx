import React from "react";
// import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";

// Define the ambassadors
export const kingsOath = {
  name: "The King’s Oath",
  image: "/bear_center.png",
  tier: "Tier 1",
  intro: "Amet avec adios abibas abelao donde",
};

export const brigadeGeneral = {
  name: "Brigade General",
  image: "/bear_center.png",
  tier: "Tier 2",
  intro: "Amet avec adios abibas abelao donde",
};

export const colonel = {
  name: "Colonel",
  image: "/bear_center.png",
  tier: "Tier 3",
  intro: "Amet avec adios abibas abelao donde",
};

export function AmbassadorCard({ ambassador }: { ambassador: any }) {
  function getAmbassadorStyle(tier: string) {
    switch (tier) {
      case "Tier 1":
        return "dark:bg-gradient-to-b dark:from-[rgba(255,193,7,0.30)] dark:to-[rgba(255,235,59,0.05)] dark:border-amber-600 bg-gradient-to-b from-[rgba(255,210,93,0.50)] to-[rgba(255,231,169,0.05)] border-amber-200 backdrop-blur dark:box-shadow-[rgba(255, 214, 129, 0.56)] shadow-lg transform scale-110";
      case "Tier 2":
        return "dark:bg-gradient-to-b dark:from-[rgba(112,128,144,0.30)] dark:to-[rgba(192,192,192,0.05)] dark:border-slate-600 bg-gradient-to-b from-[rgba(235,235,235,0.99)] to-[rgba(235,235,235,0.05)] border-slate-200 backdrop-blur shadow-lg";
      case "Tier 3":
        return "dark:bg-gradient-to-b dark:from-[rgba(255,165,0,0.30)] dark:to-[rgba(255,140,0,0.05)] dark:border-orange-600 bg-gradient-to-b from-[rgba(255,231,203,0.99)] to-[rgba(255,205,169,0.05)] border-orange-200 backdrop-blur shadow-lg";
      default:
        return "";
    }
  }

  return (
    <Link href="" target="_blank">
      <div
        className={`relative col-span-1 flex h-[440px] w-[300px] flex-col rounded-lg border border-solid ${getAmbassadorStyle(
          ambassador.tier,
        )}`}
      >
        <div className="flex flex-col items-center gap-4 px-6 pb-4 pt-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={ambassador.image} className="rounded-full" />
          </Avatar>
          <div className="text-xl font-semibold text-foreground">
            {ambassador.tier}
          </div>
          <div className="text-xl font-semibold text-foreground">
            {ambassador.name}
          </div>
          <div className="text-base font-normal text-foreground">
            {ambassador.intro}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Tiers(): React.JSX.Element {
  return (
    <>
      <div className="flex flex-col items-center justify-center pt-12 pb-12 px-32">
        <h1 className="md:leading-14 leading-24 pb-8 text-3xl font-extrabold md:text-5xl">
          Stages of an{" "}
          <span className="bg-gradient-to-r from-[rgba(255,181,113,0.9)] to-[rgba(255,122,0,0.9)] bg-clip-text text-transparent backdrop-blur-md">
            Ambassador
          </span>
        </h1>
        <div className="flex flex-wrap justify-between gap-4 p-4 pb-4">
          <AmbassadorCard ambassador={brigadeGeneral} />
          <AmbassadorCard ambassador={kingsOath} />
          <AmbassadorCard ambassador={colonel} />
        </div>
        <Button variant="outline" className="mt-12 mb-8">
          View more events
        </Button>
      </div>
    </>
  );
}