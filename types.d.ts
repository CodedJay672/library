interface AuthCredentials {
  email: string;
  password: string;
  fullName: string;
  universityId: number;
  universityCard: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  coverColor: string;
  description: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  isLoanedBook?: boolean;
}
