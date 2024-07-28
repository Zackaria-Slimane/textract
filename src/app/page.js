'use client';

import { useState, useCallback, useRef } from 'react';

export default function Home() {
	const [result, setResult] = useState(null);
	const [ready, setReady] = useState(null);
	const [text, setText] = useState('');
	const timeoutRef = useRef(null);

	const debounce = (func, delay) => {
		return (...args) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => {
				func(...args);
			}, delay);
		};
	};

	const classify = async (text) => {
		console.log('Classify function called', text);
		if (!text) return;
		if (ready === null) setReady(false);

		const result = await fetch(`/api/sentiment?text=${encodeURIComponent(text)}`);

		if (!ready) setReady(true);

		const json = await result.json();
		console.log('JSON =====', json[0]);
		setResult(json[0]);
	};

	const summerize = async (text) => {
		console.log('Summerize function called', text);
		if (!text) return;
		if (ready === null) setReady(false);

		const result = await fetch(`/api/summerize?text=${encodeURIComponent(text)}`);

		if (!ready) setReady(true);

		const json = await result.json();
		setResult(json[0]);
	};

	const generate = async (text) => {
		console.log('generate function called', text);
		if (!text) return;
		if (ready === null) setReady(false);

		const result = await fetch(`/api/generate?text=${encodeURIComponent(text)}`);

		if (!ready) setReady(true);

		const json = await result.json();
		setResult(json[0]);
	};

	const isToxic = async (text) => {
		console.log('is toxic function called', text);
		if (!text) return;
		if (ready === null) setReady(false);

		const result = await fetch(`/api/toxic?text=${encodeURIComponent(text)}`);

		if (!ready) setReady(true);

		const json = await result.json();
		setResult(json);
	};

	const debouncedClassify = useCallback(debounce(classify, 500), []);
	const debouncedSummerize = useCallback(debounce(summerize, 500), []);
	const debouncedGenerate = useCallback(debounce(generate, 500), []);
	const debouncedToxic = useCallback(debounce(isToxic, 500), []);

	const handleInput = (type) => {
		if (type === 'classify') {
			debouncedClassify(text);
		} else if (type === 'summerize') {
			debouncedSummerize(text);
		} else if (type === 'generate') {
			debouncedGenerate(text);
		} else if (type === 'toxic') {
			debouncedToxic(text);
		}
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-12'>
			<h1 className='text-5xl font-bold mb-2 text-center'>Hugging face Transformers.js</h1>

			<h2 className='text-2xl mb-10 text-center'>Sentiment / Summarize / Generate / Toxicity</h2>
			<textarea
				rows='8'
				cols='50'
				className='w-full max-w-[600px] p-2 border text-black border-gray-300 rounded mb-4'
				placeholder='Enter text here'
				onInput={(e) => {
					setText(e.target.value);
				}}
			/>
			<div className='flex gap-10 my-6'>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded'
					onClick={() => handleInput('classify')}
					disabled={ready === false || text.length === 0}>
					Classify
				</button>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded'
					onClick={() => handleInput('summerize')}
					disabled={ready === false || text.length === 0}>
					Summerize
				</button>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded'
					onClick={() => handleInput('generate')}
					disabled={ready === false || text.length === 0}>
					Generate
				</button>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded'
					onClick={() => handleInput('toxic')}
					disabled={ready === false || text.length === 0}>
					is Toxic
				</button>
			</div>

			{ready !== null && (
				<pre className='bg-gray-100 dark:bg-gray-800 p-2 rounded max-w-[600px]'>
					{!ready || !result ? 'Loading...' : JSON.stringify(result, null, 2)}
				</pre>
			)}
		</main>
	);
}
