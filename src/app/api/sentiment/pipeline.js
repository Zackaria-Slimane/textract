import { pipeline } from '@xenova/transformers';

// Use the Singleton pattern to enable lazy construction of the pipeline.
const SentimentPipe = () =>
	class PipelineSingletonSentiment {
		static task = 'text-classification';
		static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
		static instance = null;

		static async getInstance(progress_callback = null) {
			if (this.instance === null) {
				this.instance = pipeline(this.task, this.model, { progress_callback });
			}
			return this.instance;
		}
	};

let PipelineSingletonSentiment;
if (process.env.NODE_ENV !== 'production') {
	// When running in development mode, attach the pipeline to the global object so that it's preserved between hot reloads.
	if (!global.PipelineSingletonSentiment) {
		global.PipelineSingletonSentiment = SentimentPipe();
	}
	PipelineSingletonSentiment = global.PipelineSingletonSentiment;
} else {
	PipelineSingletonSentiment = SentimentPipe();
}
export default PipelineSingletonSentiment;
