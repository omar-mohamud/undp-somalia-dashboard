import data from "@/data/data.json";
import Dashboard from "@/components/Dashboard";
import type { DashboardData } from "@/lib/types";

export default function Home() {
  return <Dashboard data={data as unknown as DashboardData} />;
}
