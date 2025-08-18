
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
interface PaymentDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
function LoginAdmin({ open, onOpenChange }: PaymentDetailsProps) {
  return (
     <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className="w-[350px] bg-white p-6 rounded-lg shadow-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-primary mt-4 mb-2 text-center">
            Sign up
          </DialogTitle>
        <form>
            Admin form
        </form>

        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default LoginAdmin
