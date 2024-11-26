"use client";

import { useCallback } from "react";
import Image from "next/image";
import { IReport } from "../types/Report";
import {
  downloadReportService,
  generateDownloadLinkService,
} from "../services/report.service";

const ReportCard = (props: IReport) => {
  const { name, id } = props;

  const handleDownload = useCallback(async () => {
    try {
      const payload = {
        email: process.env.APP_EMAIL?.toString() || "user1@example.com",
        reportId: id,
      };

      const data = await generateDownloadLinkService(payload);
      const pdfBuffer = await downloadReportService(data.downloadLink);

      // Convert the buffer to a Blob
      const blob = new Blob([pdfBuffer.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);

      // Create a link and trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = "example.pdf"; // Set the downloaded file name
      link.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("error", error);
    }
  }, [id]);

  return (
    <div className="flex flex-col items-center">
      <Image src="/assets/pdf.png" alt="Pdf Image" width={200} height={100} />

      <div className="mt-8">
        <div>
          <h3 className="text-sm text-gray-700">
            <span aria-hidden="true" className="inset-0"></span>
            {name}
          </h3>
          <div className="mt-2">
            <button
              type="button"
              onClick={handleDownload}
              className="text-center inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Downloads
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
