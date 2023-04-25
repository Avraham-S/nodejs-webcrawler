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
        console.error(error);
        return error;
    }
});
const getWordCount = (html, word) => {
    let wordCount = 0;
    const split = html
        // .split(/<.*?>/g)
        .split(/>.*?</g)
        .join(" ")
        .split(" ")
        .filter((v) => v);
    // .filter((v) => v.toLowerCase() === "typescript");
    split.forEach((currentWord) => {
        if (currentWord.toLowerCase() === word.toLowerCase())
            wordCount++;
    });
    console.log(split);
    console.log(wordCount);
};
fetchHtml("https://www.digitalocean.com/community/tutorials/typescript-new-project").then((html) => getWordCount(html, "typescript"));
//# sourceMappingURL=app.js.map