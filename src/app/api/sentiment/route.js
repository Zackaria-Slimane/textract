import { NextResponse } from 'next/server.js';
import PipelineSingletonSentiment from './pipeline.js';

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
	const classifier = await PipelineSingletonSentiment.getInstance();
	const result = await classifier(text);

	return NextResponse.json(result);
}
