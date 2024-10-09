"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function ShortUrlCreator() {
  const [longUrl, setLongUrl] = useState("");
  const router = useRouter();
  const handleCreate = () => {
    try {
      fetch("http://localhost:7275/api/UrlShortener", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl }),
      });

      router.refresh();
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center mt-10">
      <h1 className="text-2xl font-bold">Short URL Creator</h1>
      <input
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        type="text"
        className="p-2 rounded-md w-1/2 "
        placeholder="Long URL"
      ></input>
      <button
        className="p-2 rounded-md bg-blue-500 text-white w-1/2 hover:bg-blue-600 transition-colors duration-300"
        onClick={handleCreate}
      >
        Create
      </button>
    </div>
  );
}

export default ShortUrlCreator;
