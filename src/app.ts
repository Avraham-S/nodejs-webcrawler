import axios from "axios";

const fetchHtml = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Failed to get page: ", url);
    return error;
  }
};

const getWordCount = (html: string, word: string): number | null => {
  if (typeof html !== "string") return null;
  let wordCount = 0;
  const split: Array<string> = html
    .split(/<.*?>/g)
    .join(" ")
    .split(" ")
    .filter((v) => v)
    .filter((v) => v.toLowerCase() === word);

  split.forEach((currentWord: string) => {
    if (currentWord.toLowerCase() === word.toLowerCase()) wordCount++;
  });
  return wordCount;
};

const getPageLinks = (html: string): string[] | undefined => {
  const links: Array<string> | null | undefined = html
    .match(/href=".*?"/gi)
    ?.map((href: string) => href.replace('href="', "").replace(/.$/, ""));
  return links;
};

const getTotalWordCountFromPages = (findWord: string, startPage: string) => {
  let totalWordCount = 0;
  fetchHtml(startPage)
    .then((html) => {
      getWordCount(html, findWord);
      return getPageLinks(html);
    })
    .then((links: string[] | undefined) => {
      const promises = links?.map((link: string) => {
        return fetchHtml(link);
      });

      return Promise.all(promises as readonly unknown[]);
    })
    .then((pages) => {
      pages.forEach((page) => {
        totalWordCount += getWordCount(page as string, findWord) || 0;
      });
      console.log(`Total count of ${findWord}: `, totalWordCount);
    });
};
getTotalWordCountFromPages(process.argv[2], process.argv[3]);
