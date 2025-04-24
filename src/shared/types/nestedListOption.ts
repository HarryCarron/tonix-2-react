import { ReactElement } from "react";

export interface NestedListOption<T> {
    label: string;
    data?: T;
    id?: number;
    children?: NestedListOption<T> [];
}