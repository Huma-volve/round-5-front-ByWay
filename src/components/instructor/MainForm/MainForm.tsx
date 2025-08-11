
export default function MainForm() {
  return (
    <>
       <section className="space-y-3 ">       
     <div className="flex   gap-4">
           <div className="space-y-1 w-full">
<label htmlFor="fname">First Name</label>
  <input type="text" className="input w-full" id="fname" placeholder="Enter your First Name"/>
          </div>

          <div className="space-y-1 w-full  ">
<label htmlFor="lname">Last Name</label>
  <input type="text" className="input w-full" id="lname" placeholder="Enter your Last Name"/>
          </div>
     </div>

          <div className="space-y-1">
<label htmlFor="Headline">Headline</label>
  <input type="text" className="input w-full" id="Headline" placeholder="Headline"/>
          </div>

          <div className="space-y-1">
<label htmlFor="Headline">About</label>
  <textarea  className="input w-full" id="Headline" placeholder=""/>
          </div>

 <div className="space-y-1">
<p><label htmlFor="skills">Skills</label></p>
<select name="skills" id="skills" className="input">
  <option value="">Effective Communication</option>
  <option value="Subject Matter Expertise">Subject Matter Expertise</option>
  <option value="Classroom Management">Classroom Management</option>
  <option value="Curriculum Development">Curriculum Development</option>
  <option value="Adaptability and Flexibility">Adaptability and Flexibility</option>
</select>
        </div></section>
</>
  )
}
