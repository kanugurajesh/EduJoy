import { NextResponse, NextRequest } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const GET = async () => {
  return NextResponse.json(
    { message: "Hello, Next.js Version 13!" },
    { status: 200 }
  );
};

export const POST = async (request: NextRequest) => {
  // @ts-ignore
  const body = await request.json();

  const { userPrompt } = body;

  const prompt = userPrompt ? userPrompt : `Generate an image of a man`;

  const imageGeneration = await replicate.run(
    "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
    {
      input: {
        prompt: prompt,
      },
    }
  );

  if (!imageGeneration) {
    return NextResponse.json(
      { message: "Error generating image" },
      { status: 500 }
    );
  }

  // @ts-ignore
  const imageURl = imageGeneration[0];

  console.log(imageURl);

  return NextResponse.json({ imageURl: imageURl }, { status: 200 });
};
