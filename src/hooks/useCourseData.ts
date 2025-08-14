import { useState, useEffect } from 'react';
import { getCourseById, getLessonsByCourseId, getLessonById, getInstructorCourses } from '@/data/coursesData';
import type { Course, Lesson } from '@/data/coursesData';

// Hook for fetching a single course by ID
export const useCourse = (courseId: string | undefined) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setCourse(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      try {
        const courseData = getCourseById(courseId);
        if (courseData) {
          setCourse(courseData);
        } else {
          setError('Course not found');
        }
      } catch {
        setError('Failed to fetch course');
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [courseId]);

  return { course, loading, error };
};

// Hook for fetching lessons by course ID
export const useLessons = (courseId: string | undefined) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setLessons([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      try {
        const lessonsData = getLessonsByCourseId(courseId);
        setLessons(lessonsData);
      } catch {
        setError('Failed to fetch lessons');
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [courseId]);

  const deleteLesson = (lessonId: string) => {
    setLessons(prev => prev.filter(lesson => lesson.id !== lessonId));
  };

  const updateLesson = (updatedLesson: Lesson) => {
    setLessons(prev => 
      prev.map(lesson => 
        lesson.id === updatedLesson.id ? updatedLesson : lesson
      )
    );
  };

  return { lessons, loading, error, deleteLesson, updateLesson };
};

// Hook for fetching a single lesson by ID
export const useLesson = (lessonId: string | undefined) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lessonId) {
      setLesson(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      try {
        const lessonData = getLessonById(lessonId);
        if (lessonData) {
          setLesson(lessonData);
        } else {
          setError('Lesson not found');
        }
      } catch {
        setError('Failed to fetch lesson');
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [lessonId]);

  return { lesson, loading, error };
};

// Hook for fetching instructor's courses
export const useInstructorCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      try {
        const coursesData = getInstructorCourses();
        setCourses(coursesData);
      } catch {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  const deleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(course => course.id !== courseId));
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses(prev => 
      prev.map(course => 
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
  };

  return { courses, loading, error, deleteCourse, updateCourse };
};
