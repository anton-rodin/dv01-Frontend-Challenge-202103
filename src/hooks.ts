import { useDispatch as useDispatchRedux, useSelector as useSelectorSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, Dispatch } from './store';

// bind types to don't import RootState and Dispatch from store
export const useDispatch: () => Dispatch = useDispatchRedux;
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorSelector;
