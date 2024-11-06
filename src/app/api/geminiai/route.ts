// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const geminiAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = geminiAI.getGenerativeModel({ model: "gemini-1.5-pro-001" });

// export async function POST(request: Request, response: Response, next: Function) {
//   try {
//     const prompt = request.body.prompt;

//     const result = await model.generateContent(prompt);
//     response.send(result.response.text());
//   } catch (error) {
//     next(error);
//   }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY is not defined");
}
const geminiAI = new GoogleGenerativeAI(apiKey);
const model = geminiAI.getGenerativeModel({ model: "gemini-1.5-pro-001" });

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const { prompt } = req.body;
      const result = await model.generateContent(prompt);
      res.status(200).json({ text: result.response.text() });
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
