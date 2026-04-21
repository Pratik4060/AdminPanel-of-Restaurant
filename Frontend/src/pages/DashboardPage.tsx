import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { MetricCard } from "../components/dashboard/MetricCard";
import { PageHeader } from "../components/layout/PageHeader";
import { fetchDashboardThunk } from "../features/dashboard/dashboardSlice";

export function DashboardPage() {
  const dispatch = useAppDispatch();
  const { summary } = useAppSelector((s) => s.dashboard);

  useEffect(() => {
    void dispatch(fetchDashboardThunk());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <PageHeader title="Dashboard" subtitle="Welcome back, Admin User" />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Today's Orders" value={`${summary?.todaysOrders ?? 0}`} note="10 completed" />
        <MetricCard title="Today's Revenue" value={`Rs. ${summary?.todaysRevenue ?? 0}`} note="+12.5%" />
        <MetricCard title="Pending Orders" value={`${summary?.pendingOrders ?? 0}`} note="Needs attention" />
        <MetricCard title="Total Customers" value={`${summary?.totalCustomers ?? 0}`} note="Active users" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-xl border border-[#e6ddd0] bg-white p-4 shadow-[0_4px_12px_rgba(44,33,18,0.04)]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[12px] font-semibold text-[#2b2b2b]">Revenue (Last 7 Days)</p>
            <span className="rounded-md border border-[#e6ddd0] bg-[#faf7f2] px-2.5 py-1 text-[11px] text-[#7b756d]">Weekly</span>
          </div>
          <div className="rounded-lg border border-[#f0e9df] bg-[#fffdf9] p-4">
            <div className="flex h-[210px] items-end gap-4 border-b border-l border-[#efe8dd] px-3 pb-2 pt-4">
              {[2, 2, 2, 2, 2, 12, 2].map((height, idx) => (
                <div key={idx} className="flex flex-1 flex-col items-center justify-end gap-2">
                  <div className="w-full border-t border-[#f29c65]" style={{ height: `${height * 14}px` }} />
                  <span className="text-[10px] text-[#8a847d]">Apr {idx + 5}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#e6ddd0] bg-white p-4 shadow-[0_4px_12px_rgba(44,33,18,0.04)]">
          <p className="mb-3 text-[12px] font-semibold text-[#2b2b2b]">Orders by Status</p>
          <div className="flex h-[244px] items-center justify-center rounded-lg border border-[#f0e9df] bg-[#fffdf9]">
            <div className="relative h-44 w-44 rounded-full bg-[conic-gradient(#f8a095_0_25%,#c7a1f4_25%_50%,#90ed97_50%_75%,#8dbef2_75%_100%)]">
              <div className="absolute inset-[28px] rounded-full bg-white" />
              <span className="absolute -left-5 top-8 text-[10px] text-[#666]">Preparing:1</span>
              <span className="absolute right-[-18px] top-8 text-[10px] text-[#666]">Pending:1</span>
              <span className="absolute -left-3 bottom-7 text-[10px] text-[#666]">Ready:1</span>
              <span className="absolute right-[-14px] bottom-7 text-[10px] text-[#666]">Completed:1</span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-[#e6ddd0] bg-white p-4 shadow-[0_4px_12px_rgba(44,33,18,0.04)]">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[12px] font-semibold text-[#2b2b2b]">Active Offers</p>
          <span className="text-[11px] text-[#8a847d]">View all</span>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {["Weekend Special", "Lunch Combo Deal", "Family Feast", "Happy Hour - Buy 1"].map((title, idx) => (
            <div key={title} className="overflow-hidden rounded-lg border border-[#eadfce] bg-white">
              <div className={`h-24 ${idx % 2 === 0 ? "bg-[linear-gradient(135deg,#936333,#dfb06d)]" : "bg-[linear-gradient(135deg,#4d2f1a,#c88f5b)]"}`} />
              <div className="p-2.5">
                <p className="truncate text-[11px] font-semibold text-[#23201b]">{title}</p>
                <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-[#7a746c]">Enjoy promotional dining deals for your customers.</p>
                <span className="mt-2 inline-flex rounded bg-[#f5ecdf] px-1.5 py-1 text-[9px] font-semibold text-brand-700">
                  {idx === 0 ? "20% OFF" : idx === 1 ? "10% OFF" : idx === 2 ? "15% OFF" : "30% OFF"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[#e6ddd0] bg-white p-4 shadow-[0_4px_12px_rgba(44,33,18,0.04)]">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[12px] font-semibold text-[#2b2b2b]">Popular Items</p>
          <div className="flex items-center gap-3 text-[11px] text-[#6f6a63]">
            <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#38b64a]" />Veg</span>
            <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full border border-[#777]" />Non Veg</span>
            <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full border border-[#777]" />Beverages</span>
          </div>
        </div>
        <div className="grid h-[190px] grid-cols-5 items-end gap-8 rounded-lg border border-[#f0e9df] bg-[#fffdf9] px-5 py-4">
          {[
            ["Paneer\nLababdar", 68],
            ["Kaju Curry", 60],
            ["Paneer\nTikka", 56],
            ["Dry Corn", 74],
            ["Ice Cream", 78],
          ].map(([name, height]) => (
            <div key={name} className="flex h-full flex-col items-center justify-end gap-2">
              <div className="w-8 rounded-t-sm bg-[#39b54a]" style={{ height: `${height}%` }} />
              <span className="whitespace-pre-line text-center text-[10px] leading-3 text-[#6b665f]">{name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
