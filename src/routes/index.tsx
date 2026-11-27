import { createFileRoute } from "@tanstack/react-router";

import { ZooLanding } from "@/pages/landing/ZooLanding";

export const Route = createFileRoute("/")({
  component: ZooLanding,
});
