"use client";

import { useCallback, useEffect, useState } from "react";
import { getReportsService } from "./services/report.service";
import { IReport } from "./types/Report";
import ReportCard from "./components/ReportCard";

export default function Home() {
  const [reports, setReports] = useState<IReport[] | null>(null);

  const getReports = useCallback(async () => {
    const params = "user1@example.com";

    try {
      const data = await getReportsService(params);
      setReports(data.reports);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    getReports();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Reports
        </h2>

        {reports && (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {reports.map((report: IReport) => (
              <ReportCard key={report.id} {...report} />
            ))}
          </div>
        )}

        <button onClick={() => alert("test")}>alert</button>
      </div>
    </div>
  );
}
