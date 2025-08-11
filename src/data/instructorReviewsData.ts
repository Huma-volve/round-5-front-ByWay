

const INSTRUCTOR_REVIEWS_DATA = [
  {
    id: 1,
    courseName: "Beginner's Guide to UI UX",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    rating: 5,
  },
  {
    id: 2,
    courseName: "Advanced React",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    rating: 4,
  },
  {
    id: 3,
    courseName: "UI Design Principles",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    rating: 3,
  },
];

export default INSTRUCTOR_REVIEWS_DATA;

export type InstructorReview = {
  id?: number;
  courseName: string;
  review: string;
  rating: number;
};
