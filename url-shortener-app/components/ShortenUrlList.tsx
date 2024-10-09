"use client";

import ShortUrl from "@/model/short-url";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ShortenUrlList({ urls }: { urls: ShortUrl[] }) {
  const router = useRouter();
  const handleDelete = (shortCode: string) => {
    // Implement delete logic here
    fetch(`http://localhost:7275/api/UrlShortener/${shortCode}`, {
      method: "DELETE",
    });
    router.refresh();
  };

  return (
    <ul className="space-y-4">
      {urls.map((url: ShortUrl) => (
        <li key={url.id} className="bg-white shadow-md rounded-lg p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="mb-2 sm:mb-0">
              <div className="text-sm text-gray-600 mb-1">Long URL:</div>
              <Link
                href={url.longUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {url.longUrl}
              </Link>
              <div className="text-sm text-gray-600 mt-1">
                Short URL:{" "}
                <span className="font-medium">{`${url.shortCode}`}</span>
              </div>
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2 mt-2 sm:mt-0 flex items-center"
              onClick={() => handleDelete(url.shortCode)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ShortenUrlList;
