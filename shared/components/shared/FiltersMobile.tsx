"use client";

import { useState } from "react";
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "shared/components/ui";
import { Filters } from ".";
import { Filter } from "lucide-react";

export const FiltersMobile = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="secondary" 
          className="w-full h-12 text-base font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <Filter className="w-5 h-5 mr-2" />
          Фильтры
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] md:w-[400px] lg:w-[400px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Фильтры</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <Filters />
        </div>
      </SheetContent>
    </Sheet>
  );
};
