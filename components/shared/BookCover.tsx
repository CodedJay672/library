import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import BookCoverSvg from "../BookCoverSvg";

type VariantRecord = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantClasses: Record<VariantRecord, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  extraClasses?: string;
  variant?: VariantRecord;
  coverUrl: string;
  color: string;
}

const BookCover = ({
  extraClasses,
  variant = "regular",
  color = "#012B48",
  coverUrl = "https://placehold.co/400x600.png",
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantClasses[variant],
        extraClasses
      )}
    >
      <BookCoverSvg coverColor={color} />
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          src={coverUrl}
          alt="book cover"
          fill
          className="object-fil rounded-md"
        />
      </div>
    </div>
  );
};

export default BookCover;
