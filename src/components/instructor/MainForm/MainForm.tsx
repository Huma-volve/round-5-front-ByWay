import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
export default function MainForm() {
    const { t } = useTranslation();

const validationSchema = Yup.object({
  fname: Yup.string()
    .min(2, t('instructor.firstNameMin'))
    .required(t('instructor.firstNameRequired')),
  lname: Yup.string()
    .min(2, t('instructor.lastNameMin'))
    .required(t('instructor.lastNameRequired')),
  headline: Yup.string()
    .max(50, t('instructor.headlineMax'))
    .required(t('instructor.headlineRequired')),
  about: Yup.string()
    .max(200, t('instructor.aboutMax'))
    .required(t('instructor.aboutRequired')),
  skills: Yup.string()
    .required(t('instructor.skillsRequired')),
});


  
  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      headline: '',
      about: '',
      skills: '',
    },
    validationSchema,
    onSubmit: values => {
      console.log('Form data:', values);
    },
  });
  return (
    <>
        <form onSubmit={formik.handleSubmit} className="space-y-3 ">       
     <div className="flex   gap-4">
           <div className="space-y-1 w-full">
<label htmlFor="fname">{t("instructor.firstName")}</label>
  <input type="text" 
  value={formik.values.fname}  onBlur={formik.handleBlur} 
  name="fname"
  onChange={formik.handleChange}  
  className="input w-full" id="fname" placeholder={t("instructor.enterFirstName")}/>
         {formik.errors.fname && formik.touched.fname && 
          <p className='text-red-600'>{formik.errors.fname}</p>}
          </div>

          <div className="space-y-1 w-full  ">
<label htmlFor="lname">{t("instructor.lastName")}</label>
  <input type="text" className="input w-full" 
  id="lname" placeholder={t("instructor.enterLastName")}  name="lname"
    value={formik.values.lname}  onBlur={formik.handleBlur} 
  onChange={formik.handleChange}  />
  {formik.errors.lname && formik.touched.lname && 
          <p className='text-red-600'>{formik.errors.lname}</p>}
          </div>
     </div>

          <div className="space-y-1">
<label htmlFor="headline">{t("instructor.headline")}</label>
  <input type="text" className="input w-full" id="headline" 
  placeholder={t("instructor.enterHeadline")}   name='headline'
  value={formik.values.headline}  onBlur={formik.handleBlur} 
  onChange={formik.handleChange}/>
    {formik.errors.headline && formik.touched.headline && 
          <p className='text-red-600'>{formik.errors.headline}</p>}
          </div>

          <div className="space-y-1">
<label htmlFor="about">{t("instructor.about")}</label>
  <textarea  className="input w-full" id="about" placeholder={t("instructor.enterAbout")} 
  value={formik.values.about} name="about"

  onBlur={formik.handleBlur} 
  onChange={formik.handleChange}/>
    {formik.errors.about && formik.touched.about && 
          <p className='text-red-600'>{formik.errors.about}</p>}
        
          </div>

 <div className="space-y-1">
<p><label htmlFor="skills">{t("instructor.skills")}</label></p>
<select name="skills" id="skills" className="input"
  value={formik.values.skills}
  onBlur={formik.handleBlur} 
  onChange={formik.handleChange}>
  <option value="">{t("instructor.effectiveCommunication")}</option>
  <option value="Subject Matter Expertise">{t("instructor.subjectMatterExpertise")}</option>
  <option value="Classroom Management">{t("instructor.classroomManagement")}</option>
  <option value="Curriculum Development">{t("instructor.curriculumDevelopment")}</option>
  <option value="Adaptability and Flexibility">{t("instructor.adaptabilityAndFlexibility")}</option>
</select>
 {formik.errors.skills && formik.touched.skills && 
          <p className='text-red-600'>{formik.errors.skills}</p>}
        </div></form>

 
</>
  )
}
