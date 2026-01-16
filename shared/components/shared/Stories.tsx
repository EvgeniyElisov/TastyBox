"use client";

import { useEffect, useState } from "react";
import { apiClient } from "shared/services";
import { Container } from ".";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";
import { cn } from "shared/lib/utils";
import { StoryType } from "shared/services/stories";
import { Skeleton } from "shared/components/ui";
import Image from "next/image";

type Props = {
  className?: string;
};

export const Stories = ({ className }: Props) => {
  const [stories, setStories] = useState<StoryType[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<StoryType>();

  useEffect(() => {
    async function fetchStories() {
      const data = await apiClient.stories.getAll();
      setStories(data);
    }
    fetchStories();
  }, []);

  const onClickStory = (story: StoryType) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container className={cn("flex items-center justify-between gap-4 my-14", className)}>
        {stories.length === 0 &&
          Array(6)
            .fill(0)
            .map((_, index) => <Skeleton key={index} className="w-[240px] h-[300px] bg-gradient-to-br from-gray-200 to-gray-100 rounded-2xl animate-pulse shadow-lg" />)}
        {stories.map((story) => (
          <div 
            key={story.id}
            className="relative group cursor-pointer"
            onClick={() => onClickStory(story)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/30 transition-all duration-300" />
            <Image 
              alt={`Story ${story.id}`}
              className="rounded-2xl transition-all duration-300 group-hover:scale-105 shadow-lg group-hover:shadow-xl" 
              height={300}
              width={240} 
              src={story.previewImageUrl} 
            />
          </div>
        ))}
      </Container>
      {open && (
        <div className="fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-[9999]">
          <div className="relative" style={{ width: 520 }}>
            <button className="absolute -right-10 -top-5 z-[10000]" onClick={() => setOpen(false)}>
              <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
            </button>
            <ReactStories
              onAllStoriesEnd={() => setOpen(false)}
              stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
              defaultInterval={3000}
              width={520}
              height={800}
            />
          </div>
        </div>
      )}
    </>
  );
};
