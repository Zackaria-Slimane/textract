import { NextResponse } from 'next/server.js';
import PipelineSingletonSummary from './pipeline.js';

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
	const summary = await PipelineSingletonSummary.getInstance();
	const result = await summary(text);

	return NextResponse.json(result);
}
