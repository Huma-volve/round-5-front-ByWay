const instructors = [
  {
    id: 8,
    name: "Zita Wunsch MD",
    email: "katelynn.beer@example.com",
    status: "Active",
    statistics: {
      total_courses: 3,
      total_students: 12,
      total_lessons: 15,
      average_rating: 3.2,
    },
    courses: [
      {
        id: 2,
        title: "Fugiat possimus consectetur maiores voluptatibus nisi.",
        description: "Voluptatem ex facere enim dolores dolor.",
        price: "691.46",
        status: "published",
        category: { id: 3, name: "Design" },
      },
    ],
  },
  {
    id: 9,
    name: "Ahmed Ali",
    email: "ahmed@example.com",
    status: "Active",
    statistics: {
      total_courses: 5,
      total_students: 50,
      total_lessons: 40,
      average_rating: 4.7,
    },
    courses: [],
  },
];

export default instructors;
