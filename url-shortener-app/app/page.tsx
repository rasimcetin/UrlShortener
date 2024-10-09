import ShortenUrlList from "@/components/ShortenUrlList";
import ShortUrlCreator from "@/components/ShortUrlCreater";
import ShortUrl from "@/model/short-url";

export default async function Home() {
  let urls: ShortUrl[] = [];
  try {
    const response = await fetch("http://localhost:7275/api/UrlShortener", {
      cache: "no-store",
    });
    urls = await response.json();
  } catch (error) {
    console.error("Error fetching URLs:", error);
  }
  console.log(urls);

  return (
    <div className="container mx-auto p-4">
      <ShortUrlCreator />
      <ShortenUrlList urls={urls} />
    </div>
  );
}
