import { pipeline } from '@xenova/transformers';

// Use the Singleton pattern to enable lazy construction of the pipeline.
const SummaryPipe = () =>
	class PipelineSingletonGenerate {
		static task = 'text-generation';
		static model = 'microsoft/Phi-3-mini-4k-instruct-onnx-web';
		static instance = null;

		static async getInstance(progress_callback = null) {
			if (this.instance === null) {
				this.instance = pipeline(this.task, this.model, { progress_callback });
			}
			return this.instance;
		}
	};

let PipelineSingletonGenerate;
if (process.env.NODE_ENV !== 'production') {
	// When running in development mode, attach the pipeline to the global object so that it's preserved between hot reloads.
	if (!global.PipelineSingletonGenerate) {
		global.PipelineSingletonGenerate = SummaryPipe();
	}
	PipelineSingletonGenerate = global.PipelineSingletonGenerate;
} else {
	PipelineSingletonGenerate = SummaryPipe();
}
export default PipelineSingletonGenerate;
