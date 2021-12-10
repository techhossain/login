import { useContext } from "react"
import { AuthContex } from "../../contexs/AuthProvider"

const useAuth = () => {
  return useContext(AuthContex);
}

export default useAuth;