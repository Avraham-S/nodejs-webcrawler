"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fetchHtml = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get(url);
        return data;
    }
    catch (error) {
        console.error("Failed to get page: ", url);
        return error;
    }
});
const getWordCount = (html, word) => {
    if (typeof html !== "string")
        return null;
    let wordCount = 0;
    const split = html
        .split(/<.*?>/g)
        .join(" ")
        .split(" ")
        .filter((v) => v)
        .filter((v) => v.toLowerCase() === word);
    split.forEach((currentWord) => {
        if (currentWord.toLowerCase() === word.toLowerCase())
            wordCount++;
    });
    return wordCount;
};
const getPageLinks = (html) => {
    var _a;
    const links = (_a = html
        .match(/href=".*?"/gi)) === null || _a === void 0 ? void 0 : _a.map((href) => href.replace('href="', "").replace(/.$/, ""));
    return links;
};
const getTotalWordCountFromPages = (findWord, startPage) => {
    let totalWordCount = 0;
    fetchHtml(startPage)
        .then((html) => {
        totalWordCount += getWordCount(html, findWord) || 0;
        return getPageLinks(html);
    })
        .then((links) => {
        const promises = links === null || links === void 0 ? void 0 : links.map((link) => {
            return fetchHtml(link);
        });
        return Promise.all(promises);
    })
        .then((pages) => {
        pages.forEach((page) => {
            totalWordCount += getWordCount(page, findWord) || 0;
        });
        console.log(`Total count of ${findWord}: `, totalWordCount);
    });
};
getTotalWordCountFromPages(process.argv[2], process.argv[3]);
//# sourceMappingURL=app.js.map