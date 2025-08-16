function FormError({error}: {error:string}) {
  return (
    <p className="text-danger text-sm mt-1">{error}</p>
  )
}
export default FormError