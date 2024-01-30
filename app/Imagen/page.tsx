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
  const [prompt, setPrompt] = useState<string>("");
  const [send, setSend] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

    // set the loading state to true
    setLoading(true);
    setSend(true);

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

    if (data.imageURl === "") {
      toast.error("No response from the server!");
      return;
    }

    // set the response in the state
    setResponse(data.imageURl);
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
      {loading ? (
        <iframe
          src="https://giphy.com/embed/4EFt4UAegpqTy3nVce"
          width="480"
          height="480"
          style={{ zIndex: -1, width: "400px", height: "400px" }}
        ></iframe>
      ) : (
        <>
          {response && (
            <Image src={response} width={400} height={400} alt="Image" />
          )}
        </>
      )}
    </main>
  );
}
