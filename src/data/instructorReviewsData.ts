const INSTRUCTOR_REVIEWS_DATA = [
  {
    id: 1,
    courseName: "Beginner's Guide to UI UX",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    rating: 5,
    date:"Reviewed on 22nd March, 2024",

    name: "john albert"
  },
  {
    id: 2,
    courseName: "Advanced React",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    rating: 4,
    date:"Reviewed on 22nd March, 2024",

    name: "salsabeel"
  },
  {
    id: 3,
    courseName: "UI Design Principles",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    rating: 3,
  date:"Reviewed on 22nd March, 2024",
},

  {
    id: 4,
    courseName: "Introduction to Machine Learning",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    rating: 5,
  date:"Reviewed on 22nd March, 2024",
},

  {
    id: 5,
    courseName: "Data Science Bootcamp",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    rating: 4,
    date:"Reviewed on 22nd March, 2024",

    name: "salsabeel"
  },
  {
    id: 6,
    courseName: "Deep Learning with TensorFlow",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    rating: 5,
    date:"Reviewed on 22nd March, 2024",

    name: "salsabeel"
  },
  {
    id: 7,
    courseName: "Natural Language Processing with Python",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    rating: 5,
    date:"Reviewed on 22nd March, 2024",

    name: "salsabeel"
  },
  {
    id: 8,
    courseName: "Computer Vision Basics",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    rating: 4,
    date:"Reviewed on 22nd March, 2024",

    name: "salsabeel"
  },
  {
    id: 9,
    courseName: "AI Ethics and Fairness",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    rating: 5,
    date:"Reviewed on 22nd March, 2024",

    name: "salsabeel"
  },
  {
    id: 10,
    courseName: "Ethics in AI",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    rating: 5,
    date:"Reviewed on 22nd March, 2024",

    name: "salsabeel"
  },
  {
    id: 11,
    courseName: "Fairness in Machine Learning",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    rating: 5,
    date:"Reviewed on 22nd March, 2024",

    name: "salsabeel"
  },
  {
    id: 12,
    courseName: "Ethics in AI",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    rating: 5,
    date:"Reviewed on 22nd March, 2024",

    name: "salsabeel"
  },
];

export default INSTRUCTOR_REVIEWS_DATA;

export type InstructorReview = {
  id?: number;
  courseName?: string;
  review: string;
  date?:string,
  rating: number;
  imageLearner: string;
  name?: string
};
