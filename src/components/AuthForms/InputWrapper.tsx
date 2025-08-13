import type { ReactElement } from "react"
import FormError from "./FormError"

function InputWrapper({children, touched = false, error = ""}: {children: ReactElement, touched:boolean, error:string}) {
  return (
    <div>
        {children}
        {error && touched? <FormError error={error}/> : null}
    </div>
  )
}
export default InputWrapper