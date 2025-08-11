import { useTranslation } from 'react-i18next';
import Review from '../../components/instructor/reviews/Review';
import INSTRUCTOR_REVIEWS_DATA from '../../data/instructorReviewsData';
import Breadcrumb from '../../components/common/Breadcrumb';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';

export default function InstructorReviews() {
    const { t,i18n } = useTranslation();
    const { getAutoBreadcrumb } = useBreadcrumb();
    
    function toggleLanguage() {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);

        // تغيير الاتجاه بناءً على اللغة
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLang;
  }
  const reviewCount = INSTRUCTOR_REVIEWS_DATA.length;
  return (
    <div className='container mx-auto py-2 flex flex-col items-center justify-center gap-2'>
      <div className="w-full max-w-4xl">
        <Breadcrumb items={getAutoBreadcrumb()} className="mb-6" />
      </div>
      <div className='text-start w-full py-4 font-bold text-xl'>
        <h1>{t("instructor.reviews")} ({reviewCount})</h1>
      </div>
      {INSTRUCTOR_REVIEWS_DATA.map(({ id, courseName, review, rating }) => (
        <Review key={id} courseName={courseName} review={review} rating={rating} />
      ))}
      <button onClick={toggleLanguage} className='bg-primary mt-4'>
        toggle
      </button>
    </div>
  )
}
