import { pipeline } from '@xenova/transformers';

// Use the Singleton pattern to enable lazy construction of the pipeline.
const SummaryPipe = () =>
	class PipelineSingletonToxic {
		static task = 'text-classification';
		static model = 'Xenova/toxic-bert';
		static instance = null;

		static async getInstance(progress_callback = null) {
			if (this.instance === null) {
				this.instance = pipeline(this.task, this.model, { progress_callback });
			}
			return this.instance;
		}
	};

let PipelineSingletonToxic;
if (process.env.NODE_ENV !== 'production') {
	// When running in development mode, attach the pipeline to the global object so that it's preserved between hot reloads.
	if (!global.PipelineSingletonToxic) {
		global.PipelineSingletonToxic = SummaryPipe();
	}
	PipelineSingletonToxic = global.PipelineSingletonToxic;
} else {
	PipelineSingletonToxic = SummaryPipe();
}
export default PipelineSingletonToxic;
