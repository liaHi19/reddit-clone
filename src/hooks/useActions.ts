import { useMemo } from "react";
import { useAppDispatch } from "../store/hooks";
import { bindActionCreators } from "@reduxjs/toolkit";

import { allActions } from "../store/rootActions";

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch]);
};
