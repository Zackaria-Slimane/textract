import { pipeline } from '@xenova/transformers';

// Use the Singleton pattern to enable lazy construction of the pipeline.
const SummaryPipe = () =>
	class PipelineSingletonSummary {
		static task = 'summarization';
		static model = 'Xenova/distilbart-cnn-6-6';
		static instance = null;

		static async getInstance(progress_callback = null) {
			if (this.instance === null) {
				this.instance = pipeline(this.task, this.model, { progress_callback });
			}
			return this.instance;
		}
	};

let PipelineSingletonSummary;
if (process.env.NODE_ENV !== 'production') {
	// When running in development mode, attach the pipeline to the global object so that it's preserved between hot reloads.
	if (!global.PipelineSingletonSummary) {
		global.PipelineSingletonSummary = SummaryPipe();
	}
	PipelineSingletonSummary = global.PipelineSingletonSummary;
} else {
	PipelineSingletonSummary = SummaryPipe();
}
export default PipelineSingletonSummary;
