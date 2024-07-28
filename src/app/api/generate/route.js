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
	const result = await generator(text, { max_new_tokens: 100 });

	return NextResponse.json(result);
}
