import { useMutation } from "@tanstack/react-query";
import { withdraw } from "@/api/instructor-revenue-api";
import { useNavigate } from "react-router-dom";

export const useInstructorWithdraw = () => {
    const navigate = useNavigate();
  return useMutation({
    mutationFn: withdraw,
    onSuccess: () => {
      navigate("/instructor/revenue");
    }
  });
};
