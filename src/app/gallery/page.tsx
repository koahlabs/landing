"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

interface SegmentOption {
  id: string;
  label: string;
}

const defaultOptions: SegmentOption[] = [
  { id: "chat", label: "Chat" },
  { id: "image", label: "Image" },
  { id: "video", label: "Video" },
];

function GallerySelector({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (selected: string) => void;
}) {
  const options = defaultOptions;

  const handleSelect = (id: string) => {
    onChange?.(id);
  };

  if (options.length === 0) {
    return (
      <div className="text-muted-foreground p-4 bg-secondary rounded-lg">
        No options available
      </div>
    );
  }

  return (
    <div className="relative flex rounded-full px-0 py-3 max-w-md bg-black/50 backdrop-blur-md select-none">
      {options.map((option) => (
        <button
          key={option.id}
          className={`w-[80px] relative z-10 flex-1 text-sm font-medium transition-all duration-200 text-center ${
            selected === option.id ? "text-black font-medium" : "text-slate-300"
          }`}
          onClick={() => handleSelect(option.id)}
        >
          {option.label}
        </button>
      ))}
      {selected && (
        <motion.div
          className="absolute my-1 mx-1 top-0 bottom-0 rounded-full bg-white"
          layoutId="active-pill"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          style={{
            width: `${90 / options.length}%`,
            left: `${
              (options.findIndex((opt) => opt.id === selected) * 90) /
                options.length +
              options.findIndex((opt) => opt.id === selected) * 3
            }%`,
          }}
        />
      )}
    </div>
  );
}

export default function Gallery() {
  const [selectedTab, setSelectedTab] = useState<string>("chat");

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center absolute top-0 left-0 right-0">
        <div className="flex flex-col items-center justify-center m-4">
          <GallerySelector
            selected={selectedTab}
            onChange={(selected) => setSelectedTab(selected)}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-slate-50 w-full h-screen">
        <div className="flex flex-col items-center justify-center max-w-2xl overflow-y-auto w-full">
          {/* {Array.from({ length: 100 }, (_, index) => (
            <div key={index}>hello</div
          ))} */}

          <div className="flex items-center justify-center bottom-0 absolute max-w-2xl bg-white border w-full rounded-t-lg px-2">
            <input
              placeholder="Ask anything..."
              className="w-full bg-transparent p-2 focus:outline-none text-sm"
            />
            <button className="p-2">
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
