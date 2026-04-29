import data from "@/data/data.json";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return <Dashboard data={data as any} />;
}
