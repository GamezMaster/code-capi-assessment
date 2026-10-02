'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-flex items-center font-medium cursor-pointer bg-transparent border-0 p-0"
    >
      &larr; Terug
    </button>
  );
}