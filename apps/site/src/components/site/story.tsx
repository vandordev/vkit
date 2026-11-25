import { useStepObserver } from "@/lib/story";
import { AgentsChapter, DecisionsChapter, DiskChapter, HeroCopy, StackChapter } from "./chapters";
import { Stage } from "./stage";

/** One pinned architecture graph on the right; the chapters on the left re-tell it as they cross the reading line. */
export function Story() {
	useStepObserver();
	return (
		<div className="vk-wrap vk-story">
			<div className="vk-story__flow">
				<HeroCopy />
				<StackChapter />
				<DiskChapter />
				<DecisionsChapter />
				<AgentsChapter />
			</div>
			<aside className="vk-story__stage" aria-label="Architecture of the selected kit">
				<Stage />
			</aside>
		</div>
	);
}
