"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TopNav from "./TopNav";
import SnapshotTab from "./tabs/SnapshotTab";
import DonorRelationsTab from "./tabs/DonorRelationsTab";
import ResourceMobilizationTab from "./tabs/ResourceMobilizationTab";
import InnovativeFinanceTab from "./tabs/InnovativeFinanceTab";
import ToolkitsTab from "./tabs/ToolkitsTab";
import TeamTab from "./tabs/TeamTab";
import CommsTab from "./tabs/CommsTab";
import PipelineStagesTab from "./tabs/PipelineStagesTab";
import { formatDate } from "@/lib/format";

const TABS = [
  { id: "snapshot", label: "Snapshot" },
  { id: "donors", label: "Donor Relations" },
  { id: "rm", label: "Resource Mobilization" },
  { id: "innovative", label: "Innovative Finance" },
  { id: "toolkits", label: "Toolkits" },
  { id: "team", label: "Team" },
  { id: "comms", label: "Comms & Visibility" },
  { id: "stages", label: "Pipeline Stages" },
];

type Props = { data: any };

export default function Dashboard({ data }: Props) {
  const [active, setActive] = useState<string>("snapshot");

  const renderTab = () => {
    switch (active) {
      case "snapshot":
        return <SnapshotTab data={data} />;
      case "donors":
        return <DonorRelationsTab data={data} />;
      case "rm":
        return <ResourceMobilizationTab data={data} />;
      case "innovative":
        return <InnovativeFinanceTab data={data} />;
      case "toolkits":
        return <ToolkitsTab data={data} />;
      case "team":
        return <TeamTab data={data} />;
      case "comms":
        return <CommsTab data={data} />;
      case "stages":
        return <PipelineStagesTab data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav
        tabs={TABS}
        active={active}
        onChange={setActive}
        asOfDate={data.asOfDate}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[1440px] px-8 lg:px-10 py-8 lg:py-10"
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-border mt-6">
        <div className="mx-auto max-w-[1440px] px-8 lg:px-10 py-5 flex items-center justify-between gap-4 text-[11px] text-muted">
          <div className="font-mono uppercase tracking-eyebrow">
            UNDP Somalia · Partnership &amp; Communication Team
          </div>
          <div className="font-mono tabular">
            Updated {formatDate(data.lastUpdated)}
          </div>
        </div>
      </footer>
    </div>
  );
}
