import React from 'react'

export default function WorkExperienceForm({title , onAdd}: { title: string ,   onAdd?: () => void; }) {
  return (
    <>
     <section  className="space-y-3 ">
               <div className="space-y-1">
<h2>{title}</h2>
  <input type="text" className="input w-full"  placeholder="Job title"/>
          </div>

          <div className="space-y-1">
 <input type="text" className="input w-full"  placeholder="Company name"/>
          </div>
              
           <div className="flex gap-4">
                <div className=" flex flex-col space-y-1 w-full">
                  <label htmlFor="StartDate">Start date</label>
  <input type="date" className="input "  id="StartDate"/>
          </div>
               <div className=" flex flex-col space-y-1 w-full">
<label htmlFor="EndDate">End Date</label>
  <input type="date" className="input"  id="EndDate"/>
          </div>
           </div>
   <div className="flex gap-2">
     <button className="py-1 px-1.5 rounded-md border border-border"
     onClick={onAdd}><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.28571 5.71429H0.714288C0.511907 5.71429 0.342383 5.64571 0.205717 5.50857C0.0690501 5.37143 0.000478653 5.2019 2.46305e-06 5C-0.000473727 4.7981 0.0680978 4.62857 0.205717 4.49143C0.343336 4.35429 0.512859 4.28571 0.714288 4.28571H4.28571V0.714288C4.28571 0.511907 4.35429 0.342383 4.49143 0.205717C4.62857 0.0690501 4.7981 0.000478653 5 2.46305e-06C5.2019 -0.000473727 5.37167 0.0680978 5.50929 0.205717C5.6469 0.343336 5.71524 0.512859 5.71429 0.714288V4.28571H9.28571C9.48809 4.28571 9.65786 4.35429 9.795 4.49143C9.93214 4.62857 10.0005 4.7981 10 5C9.99952 5.2019 9.93095 5.37167 9.79428 5.50929C9.65762 5.6469 9.48809 5.71524 9.28571 5.71429H5.71429V9.28571C5.71429 9.48809 5.64571 9.65786 5.50857 9.795C5.37143 9.93214 5.2019 10.0005 5 10C4.7981 9.99952 4.62857 9.93095 4.49143 9.79428C4.35429 9.65762 4.28571 9.48809 4.28571 9.28571V5.71429Z" fill="black"/>
</svg>
</button>
          <button>Add another Experience</button> </div>
        </section></>
  )
}
