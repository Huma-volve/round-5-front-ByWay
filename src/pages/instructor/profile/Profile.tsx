
import WorkExperienceForm from '../../../components/instructor/WorkExperienceForm/WorkExperienceForm';
import MainForm from '../../../components/instructor/MainForm/MainForm';

export default function Profile() {
  function addExperience(){

  }
  return (
    <>
    
      <main className="container mx-auto py-4" >
        <form className="space-y-5">
<MainForm/>

<WorkExperienceForm title="Work Experience" onAdd={addExperience}/>

<button className='btn space-y-4'>Save</button>
  </form>
      </main>
 
    </>
  )
}








































     