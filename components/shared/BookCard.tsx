import React from "react";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

const BookCard = ({
  title,
  genre,
  id,
  coverUrl,
  coverColor,
  isLoanedBook = false,
}: Book) => {
  return (
    <li className={cn(isLoanedBook && "w-full md:w-52")}>
      <Link
        href={`/books/${id}`}
        className={cn(isLoanedBook && "w-full flex flex-col items-center")}
      >
        <BookCover coverUrl={coverUrl} color={coverColor} />
        <div className={cn("mt-3", !isLoanedBook && "xs:max-w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 days to go</p>
            </div>
            <Button className="book-btn bg-dark-600 hover:bg-dark-600 hover:text-light-200">
              Download receipt
            </Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
