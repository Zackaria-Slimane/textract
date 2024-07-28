import { NextResponse } from 'next/server.js';
import PipelineSingletonGenerate from './pipeline.js';

export async function GET(request) {
	const text = request.nextUrl.searchParams.get('text');
	if (!text) {
		return NextResponse.json(
			{
				error: 'Missing text parameter',
			},
			{ status: 400 }
		);
	}
	// load the pipeline and cache it for future use.
	const generator = await PipelineSingletonGenerate.getInstance();
	const result = await generator(text, {
		temperature: 2,
		max_new_tokens: 100,
		repetition_penalty: 1.5,
		no_repeat_ngram_size: 2,
		num_beams: 1,
		num_return_sequences: 1,
	});

	return NextResponse.json(result);
}
