import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import BookCover from "./shared/BookCover";

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  coverColor,
  description,
  coverUrl,
}: Book) => {
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>

        <div className="book-info">
          <p className="text-light-100">
            By: <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p className="text-light-100">
            Category:{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image
              src="/assets/icons/star.svg"
              alt="rating"
              height={16}
              width={16}
            />
            <p className="text-light-100">{rating}</p>
          </div>
        </div>
        <div className="book-copies">
          <p className="text-light-100">
            Total copies: <span>{totalCopies}</span>
          </p>
          <p>
            Available copies:{" "}
            <span className="font-semibold">{availableCopies}</span>
          </p>
        </div>

        <p className="book-description">{description}</p>

        <Button className="book-overview_btn">
          <Image
            src="/assets/icons/book.svg"
            alt="boorow"
            width={20}
            height={20}
          />
          <p className="font-bebas-neue text-xl text-dark-100">Borrow</p>
        </Button>
      </div>

      <section className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            extraClasses="z-40"
            variant="wide"
            coverUrl={coverUrl}
            color={coverColor}
          />

          <div className="absolute top-16 left-10 rotate-12 max-sm:hidden">
            <BookCover variant="wide" coverUrl={coverUrl} color={coverColor} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default BookOverview;
