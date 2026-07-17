import { jsPDF } from "jspdf";

type DownloadBridgePlanProps = {
  progress: number;
  needs: string[];
  nextBestStep: string;
  planText: string;
};

function cleanMarkdown(text: string) {
  return text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/^[-*]\s+/gm, "• ")
    .trim();
}

export default function DownloadBridgePlan({
  progress,
  needs,
  nextBestStep,
  planText,
}: DownloadBridgePlanProps) {
  function downloadPDF() {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "letter",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const leftMargin = 54;
    const rightMargin = 54;
    const usableWidth = pageWidth - leftMargin - rightMargin;

    let y = 58;

    function addText(
      text: string,
      options?: {
        size?: number;
        bold?: boolean;
        spacingAfter?: number;
      }
    ) {
      const size = options?.size ?? 11;
      const spacingAfter = options?.spacingAfter ?? 12;

      pdf.setFont("helvetica", options?.bold ? "bold" : "normal");
      pdf.setFontSize(size);

      const lines = pdf.splitTextToSize(text, usableWidth);

      for (const line of lines) {
        if (y > pageHeight - 60) {
          pdf.addPage();
          y = 58;
        }

        pdf.text(line, leftMargin, y);
        y += size + 5;
      }

      y += spacingAfter;
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(24);
    pdf.text("BridgeAI", leftMargin, y);

    y += 24;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.text("Your personalized Bridge Plan", leftMargin, y);

    y += 34;

    addText(`Bridge Progress: ${progress}%`, {
      size: 16,
      bold: true,
      spacingAfter: 16,
    });

    addText("Needs Identified", {
      size: 13,
      bold: true,
      spacingAfter: 6,
    });

    if (needs.length > 0) {
      needs.forEach((need) => {
        addText(`• ${need}`, {
          spacingAfter: 2,
        });
      });
    } else {
      addText("No specific needs have been identified yet.");
    }

    y += 10;

    addText("Next Best Step", {
      size: 13,
      bold: true,
      spacingAfter: 6,
    });

    addText(
      nextBestStep ||
        "Continue sharing details so BridgeAI can identify a practical next step."
    );

    if (planText.trim()) {
      addText("Your Bridge Plan", {
        size: 15,
        bold: true,
        spacingAfter: 10,
      });

      addText(cleanMarkdown(planText), {
        spacingAfter: 18,
      });
    }

    addText(
      "BridgeAI provides general guidance and does not replace professional, medical, legal, financial, or emergency services.",
      {
        size: 9,
        spacingAfter: 0,
      }
    );

    pdf.save("BridgeAI-Bridge-Plan.pdf");
  }

  return (
    <button
      type="button"
      onClick={downloadPDF}
      disabled={progress <= 0}
      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span aria-hidden="true">📄</span>
      Download My Bridge Plan
    </button>
  );
}