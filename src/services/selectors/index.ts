import { RootState } from '../store';
import { AuthUser } from '../slices/AuthSlice';

export const selectUser = (state: RootState): AuthUser | null => state.auth.user;
export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuthenticated;
