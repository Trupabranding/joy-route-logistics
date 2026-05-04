import { createFileRoute } from "@tanstack/react-router";
import { BusinessLayout } from "@/components/BusinessLayout";

export const Route = createFileRoute("/business")({
  component: BusinessLayout,
});
