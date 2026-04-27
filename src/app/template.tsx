'use client';

import PremiumLoader from "@/components/PremiumLoader";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PremiumLoader />
      {children}
    </>
  );
}
