import { getCategoryDefinition } from "@/lib/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import type { ProductCategory, ScoredProduct } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/format";

export function ComparisonTable({
  entries,
  category
}: {
  entries: ScoredProduct[];
  category: ProductCategory;
}) {
  const dimensions = getCategoryDefinition(category).priorityOptions.slice(0, 5);

  return (
    <div className="overflow-x-auto rounded-[28px] border border-zinc-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            {entries.map((entry) => (
              <TableHead key={entry.product.id}>
                {entry.product.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-zinc-950">Price</TableCell>
            {entries.map((entry) => (
              <TableCell key={entry.product.id}>{formatCurrency(entry.product.price)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-zinc-950">Match score</TableCell>
            {entries.map((entry) => (
              <TableCell key={entry.product.id}>{Math.round(entry.score)}/100</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-zinc-950">Use-case fit</TableCell>
            {entries.map((entry) => (
              <TableCell key={entry.product.id}>{Math.round(entry.useCaseFit)}</TableCell>
            ))}
          </TableRow>
          {dimensions.map((dimension) => (
            <TableRow key={dimension.id}>
              <TableCell className="font-medium text-zinc-950">{dimension.label}</TableCell>
              {entries.map((entry) => (
                <TableCell key={entry.product.id}>
                  {entry.product.attributes[dimension.id] ?? "—"}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-medium text-zinc-950">Strengths</TableCell>
            {entries.map((entry) => (
              <TableCell key={entry.product.id} className="text-zinc-500">
                {entry.product.strengths.slice(0, 2).join(" • ")}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-zinc-950">Pricing watchout</TableCell>
            {entries.map((entry) => (
              <TableCell key={entry.product.id} className="text-zinc-500">
                {entry.product.pricingTrapNotes[0]}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
