import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/AppContext";

function SignOut() {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Sign-out successful", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: `There was an issue signing out. ${error.message}`, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
      onClick={handleClick}
    >
      Sign Out
    </button>
  );
}

export default SignOut;
