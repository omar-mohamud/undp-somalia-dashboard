import data from "@/data/data.json";
import DashboardHeader from "@/components/DashboardHeader";
import HeroStat from "@/components/HeroStat";
import KpiRow from "@/components/KpiRow";
import StageFunnel from "@/components/StageFunnel";
import DonorTypeBar from "@/components/DonorTypeBar";
import PortfolioComparison from "@/components/PortfolioComparison";
import CashTrajectoryChart from "@/components/CashTrajectoryChart";
import TopPartnersTable from "@/components/TopPartnersTable";
import DashboardFooter from "@/components/DashboardFooter";
import FadeUp from "@/components/FadeUp";

export default function Home() {
  return (
    <main className="min-h-screen">
      <DashboardHeader
        asOfDate={data.asOfDate}
        lastUpdated={data.lastUpdated}
      />

      <HeroStat
        totalPipeline={data.kpis.totalPipeline}
        donorCount={data.kpis.donorCount}
        portfolioCount={data.byPortfolio.length}
      />

      <KpiRow kpis={data.kpis} />

      <div className="mx-auto max-w-[1320px] px-8 lg:px-14">
        <div className="hairline" />
      </div>

      {/* Section: stage funnel + donor type composition */}
      <section className="mx-auto max-w-[1320px] px-8 lg:px-14 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-16">
          <FadeUp className="lg:col-span-7">
            <StageFunnel stages={data.pipelineByStage} />
          </FadeUp>
          <FadeUp delay={0.15} className="lg:col-span-5">
            <DonorTypeBar items={data.pipelineByDonorType} />
          </FadeUp>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-8 lg:px-14">
        <div className="hairline" />
      </div>

      <FadeUp>
        <PortfolioComparison portfolios={data.byPortfolio} />
      </FadeUp>

      <div className="mx-auto max-w-[1320px] px-8 lg:px-14">
        <div className="hairline" />
      </div>

      <FadeUp>
        <CashTrajectoryChart data={data.cashByMonth} asOfDate={data.asOfDate} />
      </FadeUp>

      <div className="mx-auto max-w-[1320px] px-8 lg:px-14">
        <div className="hairline" />
      </div>

      <FadeUp>
        <TopPartnersTable donors={data.topDonors} />
      </FadeUp>

      <DashboardFooter
        asOfDate={data.asOfDate}
        lastUpdated={data.lastUpdated}
      />
    </main>
  );
}
