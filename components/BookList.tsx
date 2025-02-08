import React from "react";
import BookCard from "./shared/BookCard";

const BookList = ({
  title,
  books,
  containerClass,
}: {
  title: string;
  books: Book[];
  containerClass?: string;
}) => {
  return (
    <section className={containerClass}>
      <h2 className="font-bebas-neue text-2xl text-light-100">{title}</h2>
      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
