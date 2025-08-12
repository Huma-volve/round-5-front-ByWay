import SelectPaymentMethod from "@/components/instructor/getPaid/SelectPaymentMethod";

export default function GetPaid() {
  return (
      <div className="container my-3">
          <h1 className="text-2xl font-bold mb-6">Enter Payment Details</h1>
          <SelectPaymentMethod />
    </div>
  )
}
