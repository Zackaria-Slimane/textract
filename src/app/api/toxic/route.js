import { NextResponse } from 'next/server.js';
import PipelineSingletonToxic from './pipeline.js';

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
	const toxicity = await PipelineSingletonToxic.getInstance();
	const result = await toxicity(text, { topk: null });

	return NextResponse.json(result);
}
