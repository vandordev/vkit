import { createFileRoute } from "@tanstack/react-router";
import { RoadmapPage } from "@/components/site/roadmap-page";

export const Route = createFileRoute("/roadmap")({
	head: () => ({ meta: [{ title: "Roadmap — vkit" }, { name: "description", content: "Where vkit is going: a generator in v1, add-later setups in v2." }] }),
	component: RoadmapPage,
});
