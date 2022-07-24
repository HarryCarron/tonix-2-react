export type TrackedShapeDefinitionParams = number[];
export type TrackedShapeAction = (args: TrackedShapeDefinitionParams) => void;

export enum TrackedShapeActionType {
    line,
    curve,
}

export interface TrackedShapeDefinition {
    action: TrackedShapeAction;
    actionType: TrackedShapeActionType;
    params: TrackedShapeDefinitionParams;
}
