import axios from "axios";
import { Stream } from "../utils/types";
import { ISubtitle } from "@consumet/extensions";

export async function getRiveStream(
  tmdId: string,
  episode: string,
  season: string,
  type: string,
  Streams: Stream[]
) {
  const secret = generateSecretKey(Number(tmdId));
  const servers = [
    "hydrax",
    "fastx",
    "filmecho",
    "nova",
    "guru",
    "g1",
    "g2",
    "ee3",
    "ghost",
    "putafilme",
    "asiacloud",
    "kage",
  ];
  const baseUrl = "https://rivestream.live";
  const cors = "";
  // console.log("CORS: " + cors);
  const route =
    type === "series"
      ? `/api/backendfetch?requestID=tvVideoProvider&id=${tmdId}&season=${season}&episode=${episode}&secretKey=${secret}&service=`
      : `/api/backendfetch?requestID=movieVideoProvider&id=${tmdId}&secretKey=${secret}&service=`;
  const url = baseUrl + route;
  await Promise.all(
    servers.map(async (server) => {
      // console.log("Rive: " + url + server);
      try {
        const res = await axios.get(url + server, { timeout: 4000 });
        // console.log("Rive Stream: " + url + server);
        const subtitles :ISubtitle[]= [];
        if (res.data?.data?.captions) {
          res.data?.data?.captions.forEach((sub: any) => {
            subtitles.push({
              lang: sub?.label?.split(" - ")[0] || "Und",
              url: sub?.file,
            });
          });
        }
        // console.log("Rive res: ", subtitles[0]);
        res.data?.data?.sources.forEach((source: any) => {
          Streams.push({
            server: source?.source + "-" + source?.quality,
            sources: [
              { url: source?.url, isM3U8: source?.url?.endsWith(".m3u8") },
            ],
            subtitles: subtitles,
          });
        });
      } catch (e) {
        console.log(e);
      }
    })
  );
}

function generateSecretKey(id: number | string) {
  const keyArray = [
    "I",
    "3LZu",
    "M2V3",
    "4EXX",
    "s4",
    "yRy",
    "oqMz",
    "ysE",
    "RT",
    "iSI",
    "zlc",
    "H",
    "YNp",
    "5vR6",
    "h9S",
    "R",
    "jo",
    "F",
    "h2",
    "W8",
    "i",
    "sz09",
    "Xom",
    "gpU",
    "q",
    "6Qvg",
    "Cu",
    "5Zaz",
    "VK",
    "od",
    "FGY4",
    "eu",
    "D5Q",
    "smH",
    "11eq",
    "QrXs",
    "3",
    "L3",
    "YhlP",
    "c",
    "Z",
    "YT",
    "bnsy",
    "5",
    "fcL",
    "L22G",
    "r8",
    "J",
    "4",
    "gnK",
  ];

  // Handle undefined/null input
  if (typeof id === "undefined" || id === null) {
    return "rive";
  }

  // Convert to number and calculate array index
  const numericId = typeof id === "string" ? parseInt(id, 10) : Number(id);
  const index = numericId % keyArray.length;

  // Handle NaN cases (invalid number conversion)
  if (isNaN(index)) {
    return "rive";
  }

  return keyArray[index];
}
