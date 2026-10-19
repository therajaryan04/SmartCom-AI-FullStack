import { useState } from "react";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { cn } from "@/lib/utils";

interface Props {
  targetRef: React.RefObject<HTMLElement | null>;
  title: string;
  meta: Record<string, string | number>;
  fileName: string;
}

export function ExportPdfButton({ targetRef, title, meta, fileName }: Props) {
  const [busy, setBusy] = useState(false);

  async function onExport() {
    const node = targetRef.current;
    if (!node) return;
    setBusy(true);
    try {
      const canvas = await html2canvas(node, {
        backgroundColor: getComputedStyle(document.body).backgroundColor || "#0a1520",
        scale: 2,
        useCORS: true,
      });

      const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 36;

      // Header
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text(title, margin, margin + 6);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(120);
      pdf.text(
        `Generated ${new Date().toLocaleString()} · SmartCom AI`,
        margin,
        margin + 22,
      );
      pdf.setTextColor(30);

      // Meta table
      let y = margin + 44;
      pdf.setFontSize(10);
      Object.entries(meta).forEach(([k, v]) => {
        pdf.setFont("helvetica", "bold");
        pdf.text(`${k}:`, margin, y);
        pdf.setFont("helvetica", "normal");
        pdf.text(String(v), margin + 120, y);
        y += 14;
      });

      // Chart image
      y += 10;
      const availW = pageWidth - margin * 2;
      const availH = pageHeight - y - margin;
      const ratio = canvas.width / canvas.height;
      let imgW = availW;
      let imgH = imgW / ratio;
      if (imgH > availH) {
        imgH = availH;
        imgW = imgH * ratio;
      }
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", margin, y, imgW, imgH);

      pdf.save(fileName);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[ExportPdfButton] failed", err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={onExport}
      disabled={busy}
      className={cn(
        "inline-flex items-center gap-2 bg-ocean-highlight px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-ocean-deep hover:brightness-110 disabled:opacity-60",
      )}
    >
      <Download className="size-3.5" />
      {busy ? "Exporting…" : "Export PDF"}
    </button>
  );
}
