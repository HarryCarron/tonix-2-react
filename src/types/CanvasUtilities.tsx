export type TrackedShapeDefinitionParams = number[];
export type TrackedShapeAction = <T>(args: T) => void;

export enum TrackedShapeActionType {
    line,
    curve,
}

export interface TrackedShapeDefinition {
    action: TrackedShapeAction;
    actionType: TrackedShapeActionType;
    params: TrackedShapeDefinitionParams;
}

export type BezierCurveTuple = [number, number, number, number, number, number];

export type CoOrdTuple = [number, number];

export type LineTuple = [...CoOrdTuple, ...CoOrdTuple];

export type RectTuple = [number, number, number, number, boolean];

export type CircleTuple = [number, number, number];
