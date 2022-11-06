import { User } from "../redux/slices/userSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCurrentUser = (): User => {
  const users = useAppSelector((state) => state.user);
  let currentUser;

  if (users) {
    currentUser = Object.values(users).find(
      (obj) => obj.isAuth === true
    );
  }

  if (currentUser) {
    return currentUser;
  }

  return {};
}