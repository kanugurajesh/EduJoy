"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { FileImage, Upload } from "lucide-react";
import Image from "next/image";
import { Send, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";

export default function Home() {
  // state for the prompt, response and output
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);

  const onKeyDown = (e: any) => {
    // Check if the Ctrl key is pressed along with the Enter key
    if (e.key === "Enter") {
      // Prevent the default behavior of the Enter key (e.g., new line in textarea)
      e.preventDefault();
      // Trigger the onSubmit function
      onSubmit();
    }
  };

  const onFileChange = (e: any) => {
    // Get the file
    const file = e.target.files[0];
    // Check if the file is null
    if (!file) {
      toast.error("No file selected!");
      return;
    }
    // Check if the file type is supported
    if (!file.type.includes("text")) {
      toast.error("File type not supported!");
      return;
    }
    // Read the file
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    // On reader load
    reader.onload = (readerEvent) => {
      // Set the prompt to the file content
      // @ts-ignore
      setPrompt(readerEvent.target?.result || "done");
    };
  };

  const onSubmit = async () => {
    if (prompt === "") {
      toast.error("Prompt cannot be empty!");
      return;
    }

    // clear the output
    setOutput("");

    // set the loading state to true
    setLoading(true);

    // create a post request to the /api/chat endpoint
    const response = await fetch("api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userPrompt: prompt,
      }),
    });

    // get the response from the server
    const data = await response.json();

    setLoading(false);

    if (data.error) {
      toast.error(data.error);
      return;
    }

    if (data.text === "") {
      toast.error("No response from the server!");
      return;
    }

    // set the response in the state
    setResponse(data.text);
  };

  return (
    <main className={`flex flex-col items-center h-screen gap-4 mt-10`}>
      <Toaster />
      <div className="flex gap-2 items-center mb-5">
        <FileImage size="64" />
        <span className="text-3xl font-bold">Imagen</span>
      </div>
      <div className="flex gap-2 items-center">
        <div className="relative">
          <Input
            type="text"
            placeholder="prompt"
            value={prompt}
            className={cn(
              "min-w-[320px] sm:min-w-[400px] md:min-w-[500px] h-[50px] pr-12"
            )}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            onKeyDown={(e) => onKeyDown(e)}
          />
          {loading ? (
            <button className="absolute top-3 right-3 hover:scale-110 transition ease-in-out">
              <BeatLoader color="#000" size={8} />
            </button>
          ) : (
            <button
              onClick={() => onSubmit()}
              className="absolute top-3 right-3 hover:scale-110 transition ease-in-out"
            >
              <Send />
            </button>
          )}
        </div>
        <Input
          type="file"
          onChange={(e) => onFileChange(e)}
          className="hidden"
        />
        <Button
          variant="outline"
          className={cn("w-[40px] p-1")}
          onClick={() => {
            const fileInput = document.querySelector(
              "input[type=file]"
            ) as HTMLInputElement;
            fileInput.click();
          }}
        >
          <Upload className={cn("w-[20px]")} />
        </Button>
      </div>
      {/* @ts-ignore */}

      {loading ? (
        <iframe
          src="https://giphy.com/embed/4EFt4UAegpqTy3nVce"
          width="480"
          height="480"
        //   class="giphy-embed"
          style={{ zIndex: -1, width: "400px", height: "400px" }}
        ></iframe>
      ) : (
        <Image
          src={
            "https://ik.imagekit.io/hbzknb1hm/teaching.png?updatedAt=1706009992970"
          }
          width={200}
          height={200}
          alt="Image"
        />
      )}
    </main>
  );
}
