import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectPaymentMethod() {
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Please Select... " />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="credit-card">Credit Card</SelectItem>
          <SelectItem value="paypal">PayPal</SelectItem>
          <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
