import axios from "axios";

const fetchHtml = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getWordCount = (html: string, word: string) => {
  let wordCount = 0;
  const split: Array<string> = html
    .split(/<.*?>/g)
    .join(" ")
    .split(" ")
    .filter((v) => v)
    .filter((v) => v.toLowerCase() === "typescript");

  split.forEach((currentWord: string) => {
    if (currentWord.toLowerCase() === word.toLowerCase()) wordCount++;
  });
  return wordCount;
};

fetchHtml(
  "https://www.digitalocean.com/community/tutorials/typescript-new-project"
).then((html) => getWordCount(html, "typescript"));
