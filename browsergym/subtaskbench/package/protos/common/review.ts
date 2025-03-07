/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "common";

export enum ConditionType {
  /** UNSPECIFIED - Default value if none is specified. */
  UNSPECIFIED = 0,
  ANY_EXTRACTED_FIELD = 1,
  AVERAGE_CONFIDENCE_SCORE = 2,
  SPECIFIC_EXTRACTED_FIELD = 3,
  ANY_EMPTY_PREDICTIONS = 4,
  RANDOM_SAMPLE_PERCENT = 5,
  UNRECOGNIZED = -1,
}

export function conditionTypeFromJSON(object: any): ConditionType {
  switch (object) {
    case 0:
    case "CONDITION_TYPE_UNSPECIFIED":
      return ConditionType.UNSPECIFIED;
    case 1:
    case "CONDITION_TYPE_ANY_EXTRACTED_FIELD":
      return ConditionType.ANY_EXTRACTED_FIELD;
    case 2:
    case "CONDITION_TYPE_AVERAGE_CONFIDENCE_SCORE":
      return ConditionType.AVERAGE_CONFIDENCE_SCORE;
    case 3:
    case "CONDITION_TYPE_SPECIFIC_EXTRACTED_FIELD":
      return ConditionType.SPECIFIC_EXTRACTED_FIELD;
    case 4:
    case "CONDITION_TYPE_ANY_EMPTY_PREDICTIONS":
      return ConditionType.ANY_EMPTY_PREDICTIONS;
    case 5:
    case "CONDITION_TYPE_RANDOM_SAMPLE_PERCENT":
      return ConditionType.RANDOM_SAMPLE_PERCENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ConditionType.UNRECOGNIZED;
  }
}

export function conditionTypeToJSON(object: ConditionType): string {
  switch (object) {
    case ConditionType.UNSPECIFIED:
      return "CONDITION_TYPE_UNSPECIFIED";
    case ConditionType.ANY_EXTRACTED_FIELD:
      return "CONDITION_TYPE_ANY_EXTRACTED_FIELD";
    case ConditionType.AVERAGE_CONFIDENCE_SCORE:
      return "CONDITION_TYPE_AVERAGE_CONFIDENCE_SCORE";
    case ConditionType.SPECIFIC_EXTRACTED_FIELD:
      return "CONDITION_TYPE_SPECIFIC_EXTRACTED_FIELD";
    case ConditionType.ANY_EMPTY_PREDICTIONS:
      return "CONDITION_TYPE_ANY_EMPTY_PREDICTIONS";
    case ConditionType.RANDOM_SAMPLE_PERCENT:
      return "CONDITION_TYPE_RANDOM_SAMPLE_PERCENT";
    case ConditionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum LogicalOperator {
  UNSPECIFIED = 0,
  AND = 1,
  OR = 2,
  NOT = 3,
  UNRECOGNIZED = -1,
}

export function logicalOperatorFromJSON(object: any): LogicalOperator {
  switch (object) {
    case 0:
    case "LOGICAL_OPERATOR_UNSPECIFIED":
      return LogicalOperator.UNSPECIFIED;
    case 1:
    case "LOGICAL_OPERATOR_AND":
      return LogicalOperator.AND;
    case 2:
    case "LOGICAL_OPERATOR_OR":
      return LogicalOperator.OR;
    case 3:
    case "LOGICAL_OPERATOR_NOT":
      return LogicalOperator.NOT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LogicalOperator.UNRECOGNIZED;
  }
}

export function logicalOperatorToJSON(object: LogicalOperator): string {
  switch (object) {
    case LogicalOperator.UNSPECIFIED:
      return "LOGICAL_OPERATOR_UNSPECIFIED";
    case LogicalOperator.AND:
      return "LOGICAL_OPERATOR_AND";
    case LogicalOperator.OR:
      return "LOGICAL_OPERATOR_OR";
    case LogicalOperator.NOT:
      return "LOGICAL_OPERATOR_NOT";
    case LogicalOperator.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum Operator {
  UNSPECIFIED = 0,
  EQUAL = 2,
  LESS_THAN = 3,
  GREATER_THAN = 4,
  CONTAINS = 5,
  EXISTS = 6,
  DOES_NOT_EXIST = 7,
  GREATER_THAN_EQUAL = 8,
  LESS_THAN_EQUAL = 9,
  UNRECOGNIZED = -1,
}

export function operatorFromJSON(object: any): Operator {
  switch (object) {
    case 0:
    case "OPERATOR_UNSPECIFIED":
      return Operator.UNSPECIFIED;
    case 2:
    case "OPERATOR_EQUAL":
      return Operator.EQUAL;
    case 3:
    case "OPERATOR_LESS_THAN":
      return Operator.LESS_THAN;
    case 4:
    case "OPERATOR_GREATER_THAN":
      return Operator.GREATER_THAN;
    case 5:
    case "OPERATOR_CONTAINS":
      return Operator.CONTAINS;
    case 6:
    case "OPERATOR_EXISTS":
      return Operator.EXISTS;
    case 7:
    case "OPERATOR_DOES_NOT_EXIST":
      return Operator.DOES_NOT_EXIST;
    case 8:
    case "OPERATOR_GREATER_THAN_EQUAL":
      return Operator.GREATER_THAN_EQUAL;
    case 9:
    case "OPERATOR_LESS_THAN_EQUAL":
      return Operator.LESS_THAN_EQUAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Operator.UNRECOGNIZED;
  }
}

export function operatorToJSON(object: Operator): string {
  switch (object) {
    case Operator.UNSPECIFIED:
      return "OPERATOR_UNSPECIFIED";
    case Operator.EQUAL:
      return "OPERATOR_EQUAL";
    case Operator.LESS_THAN:
      return "OPERATOR_LESS_THAN";
    case Operator.GREATER_THAN:
      return "OPERATOR_GREATER_THAN";
    case Operator.CONTAINS:
      return "OPERATOR_CONTAINS";
    case Operator.EXISTS:
      return "OPERATOR_EXISTS";
    case Operator.DOES_NOT_EXIST:
      return "OPERATOR_DOES_NOT_EXIST";
    case Operator.GREATER_THAN_EQUAL:
      return "OPERATOR_GREATER_THAN_EQUAL";
    case Operator.LESS_THAN_EQUAL:
      return "OPERATOR_LESS_THAN_EQUAL";
    case Operator.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ReviewerList {
  $type?: "common.ReviewerList";
  /**
   * Will be deprecated once we shift assignment strategy to
   * assignment_config_options
   *
   * @deprecated
   */
  users?:
    | WorkflowUser[]
    | undefined;
  /** Round_number will start from 1 */
  roundNumber?:
    | number
    | undefined;
  /** review_trigger_condition stores whether the round will require a review from human or not */
  triggerCondition?:
    | ReviewTriggerCondition
    | undefined;
  /**
   * AssignmentConfigOptions stores different strategies to follow while
   * assigning user to a task
   */
  assignmentOption?: WorkflowAssignmentOption | undefined;
}

export interface WorkflowUser {
  $type?: "common.WorkflowUser";
  user?:
    | string
    | undefined;
  /** Allows an user to reject future tasks from this workflow. */
  enabled?: boolean | undefined;
}

export interface ReviewTriggerCondition {
  $type?: "common.ReviewTriggerCondition";
  /**
   * percent_of_random_sample moved inside params so this is deprecated
   *
   * @deprecated
   */
  percentOfRandomSample?: number | undefined;
  conditionType?:
    | ConditionType
    | undefined;
  /** Contain all the params required for different condition types */
  conditionOptions?: ConditionOptions | undefined;
}

export interface CompositeGroupCondition {
  $type?: "common.CompositeGroupCondition";
  logicalOperator?: LogicalOperator | undefined;
  conditions?: Condition[] | undefined;
  nestedConditions?: CompositeGroupCondition[] | undefined;
  groupIndex?: number | undefined;
}

export interface ConditionOptions {
  $type?: "common.ConditionOptions";
  /** group_condition will contain all the specific attribute conditions i.e xyz > 20 */
  groupCondition?:
    | CompositeGroupCondition
    | undefined;
  /** percent_of_random_sample moved here also as we are using condition types */
  percentOfRandomSample?:
    | number
    | undefined;
  /** confidence_score is for avg and any extracted field condition types */
  confidenceScore?: number | undefined;
}

export interface Condition {
  $type?: "common.Condition";
  /**
   * We should no longer use attribute, it will be deprecated soon, use attribute_type instead
   *
   * @deprecated
   */
  attribute?: string | undefined;
  operator?: Operator | undefined;
  value?: string | undefined;
  attributeType?: AttributeType | undefined;
}

export interface AttributeType {
  $type?: "common.AttributeType";
  /** For simple entity, parent will be empty */
  parent?: string | undefined;
  name?: string | undefined;
}

export interface WorkflowAssignmentOption {
  $type?: "common.WorkflowAssignmentOption";
  /**
   * It takes priority over basic round robin assignment but not over manual assignment
   * Set of conditions to be evaluated for corresponding assignment to user group
   */
  conditionalAssignment?:
    | ConditionalAssignment[]
    | undefined;
  /** Basic round robin Configurations */
  basicRoundRobin?:
    | BasicRoundRobin
    | undefined;
  /**
   * If the admin wants to leave the assignment to themselves or a group of
   * user can directly assign themselves, this can be configured.
   * Note: If this field is set, the other assignment options will be ignored.
   */
  manualAssignment?: ManualAssignment | undefined;
}

export interface ConditionalAssignment {
  $type?: "common.ConditionalAssignment";
  groupCondition?: CompositeGroupCondition | undefined;
  users?: WorkflowUser[] | undefined;
}

export interface BasicRoundRobin {
  $type?: "common.BasicRoundRobin";
  /**
   * max number of tasks to be assigned to a reviewer
   * Current default is 10
   */
  numberOfTasks?: number | undefined;
  users?: WorkflowUser[] | undefined;
}

export interface ManualAssignment {
  $type?: "common.ManualAssignment";
  users?: WorkflowUser[] | undefined;
}

function createBaseReviewerList(): ReviewerList {
  return {
    $type: "common.ReviewerList",
    users: [],
    roundNumber: 0,
    triggerCondition: undefined,
    assignmentOption: undefined,
  };
}

export const ReviewerList = {
  $type: "common.ReviewerList" as const,

  encode(message: ReviewerList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.users !== undefined && message.users.length !== 0) {
      for (const v of message.users) {
        WorkflowUser.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.roundNumber !== undefined && message.roundNumber !== 0) {
      writer.uint32(16).int32(message.roundNumber);
    }
    if (message.triggerCondition !== undefined) {
      ReviewTriggerCondition.encode(message.triggerCondition, writer.uint32(26).fork()).ldelim();
    }
    if (message.assignmentOption !== undefined) {
      WorkflowAssignmentOption.encode(message.assignmentOption, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReviewerList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReviewerList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.users!.push(WorkflowUser.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.roundNumber = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.triggerCondition = ReviewTriggerCondition.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.assignmentOption = WorkflowAssignmentOption.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReviewerList {
    return {
      $type: ReviewerList.$type,
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => WorkflowUser.fromJSON(e)) : [],
      roundNumber: isSet(object.roundNumber) ? globalThis.Number(object.roundNumber) : 0,
      triggerCondition: isSet(object.triggerCondition)
        ? ReviewTriggerCondition.fromJSON(object.triggerCondition)
        : undefined,
      assignmentOption: isSet(object.assignmentOption)
        ? WorkflowAssignmentOption.fromJSON(object.assignmentOption)
        : undefined,
    };
  },

  toJSON(message: ReviewerList): unknown {
    const obj: any = {};
    if (message.users?.length) {
      obj.users = message.users.map((e) => WorkflowUser.toJSON(e));
    }
    if (message.roundNumber !== undefined && message.roundNumber !== 0) {
      obj.roundNumber = Math.round(message.roundNumber);
    }
    if (message.triggerCondition !== undefined) {
      obj.triggerCondition = ReviewTriggerCondition.toJSON(message.triggerCondition);
    }
    if (message.assignmentOption !== undefined) {
      obj.assignmentOption = WorkflowAssignmentOption.toJSON(message.assignmentOption);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReviewerList>, I>>(base?: I): ReviewerList {
    return ReviewerList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReviewerList>, I>>(object: I): ReviewerList {
    const message = createBaseReviewerList();
    message.users = object.users?.map((e) => WorkflowUser.fromPartial(e)) || [];
    message.roundNumber = object.roundNumber ?? 0;
    message.triggerCondition = (object.triggerCondition !== undefined && object.triggerCondition !== null)
      ? ReviewTriggerCondition.fromPartial(object.triggerCondition)
      : undefined;
    message.assignmentOption = (object.assignmentOption !== undefined && object.assignmentOption !== null)
      ? WorkflowAssignmentOption.fromPartial(object.assignmentOption)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ReviewerList.$type, ReviewerList);

function createBaseWorkflowUser(): WorkflowUser {
  return { $type: "common.WorkflowUser", user: "", enabled: false };
}

export const WorkflowUser = {
  $type: "common.WorkflowUser" as const,

  encode(message: WorkflowUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined && message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    if (message.enabled !== undefined && message.enabled !== false) {
      writer.uint32(16).bool(message.enabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.enabled = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowUser {
    return {
      $type: WorkflowUser.$type,
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      enabled: isSet(object.enabled) ? globalThis.Boolean(object.enabled) : false,
    };
  },

  toJSON(message: WorkflowUser): unknown {
    const obj: any = {};
    if (message.user !== undefined && message.user !== "") {
      obj.user = message.user;
    }
    if (message.enabled !== undefined && message.enabled !== false) {
      obj.enabled = message.enabled;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowUser>, I>>(base?: I): WorkflowUser {
    return WorkflowUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowUser>, I>>(object: I): WorkflowUser {
    const message = createBaseWorkflowUser();
    message.user = object.user ?? "";
    message.enabled = object.enabled ?? false;
    return message;
  },
};

messageTypeRegistry.set(WorkflowUser.$type, WorkflowUser);

function createBaseReviewTriggerCondition(): ReviewTriggerCondition {
  return {
    $type: "common.ReviewTriggerCondition",
    percentOfRandomSample: 0,
    conditionType: 0,
    conditionOptions: undefined,
  };
}

export const ReviewTriggerCondition = {
  $type: "common.ReviewTriggerCondition" as const,

  encode(message: ReviewTriggerCondition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.percentOfRandomSample !== undefined && message.percentOfRandomSample !== 0) {
      writer.uint32(13).float(message.percentOfRandomSample);
    }
    if (message.conditionType !== undefined && message.conditionType !== 0) {
      writer.uint32(16).int32(message.conditionType);
    }
    if (message.conditionOptions !== undefined) {
      ConditionOptions.encode(message.conditionOptions, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReviewTriggerCondition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReviewTriggerCondition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.percentOfRandomSample = reader.float();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.conditionType = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.conditionOptions = ConditionOptions.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReviewTriggerCondition {
    return {
      $type: ReviewTriggerCondition.$type,
      percentOfRandomSample: isSet(object.percentOfRandomSample) ? globalThis.Number(object.percentOfRandomSample) : 0,
      conditionType: isSet(object.conditionType) ? conditionTypeFromJSON(object.conditionType) : 0,
      conditionOptions: isSet(object.conditionOptions) ? ConditionOptions.fromJSON(object.conditionOptions) : undefined,
    };
  },

  toJSON(message: ReviewTriggerCondition): unknown {
    const obj: any = {};
    if (message.percentOfRandomSample !== undefined && message.percentOfRandomSample !== 0) {
      obj.percentOfRandomSample = message.percentOfRandomSample;
    }
    if (message.conditionType !== undefined && message.conditionType !== 0) {
      obj.conditionType = conditionTypeToJSON(message.conditionType);
    }
    if (message.conditionOptions !== undefined) {
      obj.conditionOptions = ConditionOptions.toJSON(message.conditionOptions);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReviewTriggerCondition>, I>>(base?: I): ReviewTriggerCondition {
    return ReviewTriggerCondition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReviewTriggerCondition>, I>>(object: I): ReviewTriggerCondition {
    const message = createBaseReviewTriggerCondition();
    message.percentOfRandomSample = object.percentOfRandomSample ?? 0;
    message.conditionType = object.conditionType ?? 0;
    message.conditionOptions = (object.conditionOptions !== undefined && object.conditionOptions !== null)
      ? ConditionOptions.fromPartial(object.conditionOptions)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ReviewTriggerCondition.$type, ReviewTriggerCondition);

function createBaseCompositeGroupCondition(): CompositeGroupCondition {
  return {
    $type: "common.CompositeGroupCondition",
    logicalOperator: 0,
    conditions: [],
    nestedConditions: [],
    groupIndex: 0,
  };
}

export const CompositeGroupCondition = {
  $type: "common.CompositeGroupCondition" as const,

  encode(message: CompositeGroupCondition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.logicalOperator !== undefined && message.logicalOperator !== 0) {
      writer.uint32(8).int32(message.logicalOperator);
    }
    if (message.conditions !== undefined && message.conditions.length !== 0) {
      for (const v of message.conditions) {
        Condition.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.nestedConditions !== undefined && message.nestedConditions.length !== 0) {
      for (const v of message.nestedConditions) {
        CompositeGroupCondition.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.groupIndex !== undefined && message.groupIndex !== 0) {
      writer.uint32(32).int32(message.groupIndex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CompositeGroupCondition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompositeGroupCondition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.logicalOperator = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.conditions!.push(Condition.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nestedConditions!.push(CompositeGroupCondition.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.groupIndex = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CompositeGroupCondition {
    return {
      $type: CompositeGroupCondition.$type,
      logicalOperator: isSet(object.logicalOperator) ? logicalOperatorFromJSON(object.logicalOperator) : 0,
      conditions: globalThis.Array.isArray(object?.conditions)
        ? object.conditions.map((e: any) => Condition.fromJSON(e))
        : [],
      nestedConditions: globalThis.Array.isArray(object?.nestedConditions)
        ? object.nestedConditions.map((e: any) => CompositeGroupCondition.fromJSON(e))
        : [],
      groupIndex: isSet(object.groupIndex) ? globalThis.Number(object.groupIndex) : 0,
    };
  },

  toJSON(message: CompositeGroupCondition): unknown {
    const obj: any = {};
    if (message.logicalOperator !== undefined && message.logicalOperator !== 0) {
      obj.logicalOperator = logicalOperatorToJSON(message.logicalOperator);
    }
    if (message.conditions?.length) {
      obj.conditions = message.conditions.map((e) => Condition.toJSON(e));
    }
    if (message.nestedConditions?.length) {
      obj.nestedConditions = message.nestedConditions.map((e) => CompositeGroupCondition.toJSON(e));
    }
    if (message.groupIndex !== undefined && message.groupIndex !== 0) {
      obj.groupIndex = Math.round(message.groupIndex);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CompositeGroupCondition>, I>>(base?: I): CompositeGroupCondition {
    return CompositeGroupCondition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CompositeGroupCondition>, I>>(object: I): CompositeGroupCondition {
    const message = createBaseCompositeGroupCondition();
    message.logicalOperator = object.logicalOperator ?? 0;
    message.conditions = object.conditions?.map((e) => Condition.fromPartial(e)) || [];
    message.nestedConditions = object.nestedConditions?.map((e) => CompositeGroupCondition.fromPartial(e)) || [];
    message.groupIndex = object.groupIndex ?? 0;
    return message;
  },
};

messageTypeRegistry.set(CompositeGroupCondition.$type, CompositeGroupCondition);

function createBaseConditionOptions(): ConditionOptions {
  return {
    $type: "common.ConditionOptions",
    groupCondition: undefined,
    percentOfRandomSample: undefined,
    confidenceScore: undefined,
  };
}

export const ConditionOptions = {
  $type: "common.ConditionOptions" as const,

  encode(message: ConditionOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupCondition !== undefined) {
      CompositeGroupCondition.encode(message.groupCondition, writer.uint32(10).fork()).ldelim();
    }
    if (message.percentOfRandomSample !== undefined) {
      writer.uint32(21).float(message.percentOfRandomSample);
    }
    if (message.confidenceScore !== undefined) {
      writer.uint32(29).float(message.confidenceScore);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConditionOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConditionOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groupCondition = CompositeGroupCondition.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.percentOfRandomSample = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.confidenceScore = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConditionOptions {
    return {
      $type: ConditionOptions.$type,
      groupCondition: isSet(object.groupCondition)
        ? CompositeGroupCondition.fromJSON(object.groupCondition)
        : undefined,
      percentOfRandomSample: isSet(object.percentOfRandomSample)
        ? globalThis.Number(object.percentOfRandomSample)
        : undefined,
      confidenceScore: isSet(object.confidenceScore) ? globalThis.Number(object.confidenceScore) : undefined,
    };
  },

  toJSON(message: ConditionOptions): unknown {
    const obj: any = {};
    if (message.groupCondition !== undefined) {
      obj.groupCondition = CompositeGroupCondition.toJSON(message.groupCondition);
    }
    if (message.percentOfRandomSample !== undefined) {
      obj.percentOfRandomSample = message.percentOfRandomSample;
    }
    if (message.confidenceScore !== undefined) {
      obj.confidenceScore = message.confidenceScore;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConditionOptions>, I>>(base?: I): ConditionOptions {
    return ConditionOptions.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConditionOptions>, I>>(object: I): ConditionOptions {
    const message = createBaseConditionOptions();
    message.groupCondition = (object.groupCondition !== undefined && object.groupCondition !== null)
      ? CompositeGroupCondition.fromPartial(object.groupCondition)
      : undefined;
    message.percentOfRandomSample = object.percentOfRandomSample ?? undefined;
    message.confidenceScore = object.confidenceScore ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(ConditionOptions.$type, ConditionOptions);

function createBaseCondition(): Condition {
  return { $type: "common.Condition", attribute: "", operator: 0, value: "", attributeType: undefined };
}

export const Condition = {
  $type: "common.Condition" as const,

  encode(message: Condition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.attribute !== undefined && message.attribute !== "") {
      writer.uint32(10).string(message.attribute);
    }
    if (message.operator !== undefined && message.operator !== 0) {
      writer.uint32(16).int32(message.operator);
    }
    if (message.value !== undefined && message.value !== "") {
      writer.uint32(26).string(message.value);
    }
    if (message.attributeType !== undefined) {
      AttributeType.encode(message.attributeType, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Condition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCondition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.attribute = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.operator = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.value = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.attributeType = AttributeType.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Condition {
    return {
      $type: Condition.$type,
      attribute: isSet(object.attribute) ? globalThis.String(object.attribute) : "",
      operator: isSet(object.operator) ? operatorFromJSON(object.operator) : 0,
      value: isSet(object.value) ? globalThis.String(object.value) : "",
      attributeType: isSet(object.attributeType) ? AttributeType.fromJSON(object.attributeType) : undefined,
    };
  },

  toJSON(message: Condition): unknown {
    const obj: any = {};
    if (message.attribute !== undefined && message.attribute !== "") {
      obj.attribute = message.attribute;
    }
    if (message.operator !== undefined && message.operator !== 0) {
      obj.operator = operatorToJSON(message.operator);
    }
    if (message.value !== undefined && message.value !== "") {
      obj.value = message.value;
    }
    if (message.attributeType !== undefined) {
      obj.attributeType = AttributeType.toJSON(message.attributeType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Condition>, I>>(base?: I): Condition {
    return Condition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Condition>, I>>(object: I): Condition {
    const message = createBaseCondition();
    message.attribute = object.attribute ?? "";
    message.operator = object.operator ?? 0;
    message.value = object.value ?? "";
    message.attributeType = (object.attributeType !== undefined && object.attributeType !== null)
      ? AttributeType.fromPartial(object.attributeType)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(Condition.$type, Condition);

function createBaseAttributeType(): AttributeType {
  return { $type: "common.AttributeType", parent: "", name: "" };
}

export const AttributeType = {
  $type: "common.AttributeType" as const,

  encode(message: AttributeType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== undefined && message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AttributeType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttributeType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parent = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AttributeType {
    return {
      $type: AttributeType.$type,
      parent: isSet(object.parent) ? globalThis.String(object.parent) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: AttributeType): unknown {
    const obj: any = {};
    if (message.parent !== undefined && message.parent !== "") {
      obj.parent = message.parent;
    }
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AttributeType>, I>>(base?: I): AttributeType {
    return AttributeType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AttributeType>, I>>(object: I): AttributeType {
    const message = createBaseAttributeType();
    message.parent = object.parent ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

messageTypeRegistry.set(AttributeType.$type, AttributeType);

function createBaseWorkflowAssignmentOption(): WorkflowAssignmentOption {
  return {
    $type: "common.WorkflowAssignmentOption",
    conditionalAssignment: [],
    basicRoundRobin: undefined,
    manualAssignment: undefined,
  };
}

export const WorkflowAssignmentOption = {
  $type: "common.WorkflowAssignmentOption" as const,

  encode(message: WorkflowAssignmentOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.conditionalAssignment !== undefined && message.conditionalAssignment.length !== 0) {
      for (const v of message.conditionalAssignment) {
        ConditionalAssignment.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.basicRoundRobin !== undefined) {
      BasicRoundRobin.encode(message.basicRoundRobin, writer.uint32(18).fork()).ldelim();
    }
    if (message.manualAssignment !== undefined) {
      ManualAssignment.encode(message.manualAssignment, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowAssignmentOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowAssignmentOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.conditionalAssignment!.push(ConditionalAssignment.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.basicRoundRobin = BasicRoundRobin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.manualAssignment = ManualAssignment.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowAssignmentOption {
    return {
      $type: WorkflowAssignmentOption.$type,
      conditionalAssignment: globalThis.Array.isArray(object?.conditionalAssignment)
        ? object.conditionalAssignment.map((e: any) => ConditionalAssignment.fromJSON(e))
        : [],
      basicRoundRobin: isSet(object.basicRoundRobin) ? BasicRoundRobin.fromJSON(object.basicRoundRobin) : undefined,
      manualAssignment: isSet(object.manualAssignment) ? ManualAssignment.fromJSON(object.manualAssignment) : undefined,
    };
  },

  toJSON(message: WorkflowAssignmentOption): unknown {
    const obj: any = {};
    if (message.conditionalAssignment?.length) {
      obj.conditionalAssignment = message.conditionalAssignment.map((e) => ConditionalAssignment.toJSON(e));
    }
    if (message.basicRoundRobin !== undefined) {
      obj.basicRoundRobin = BasicRoundRobin.toJSON(message.basicRoundRobin);
    }
    if (message.manualAssignment !== undefined) {
      obj.manualAssignment = ManualAssignment.toJSON(message.manualAssignment);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowAssignmentOption>, I>>(base?: I): WorkflowAssignmentOption {
    return WorkflowAssignmentOption.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowAssignmentOption>, I>>(object: I): WorkflowAssignmentOption {
    const message = createBaseWorkflowAssignmentOption();
    message.conditionalAssignment = object.conditionalAssignment?.map((e) => ConditionalAssignment.fromPartial(e)) ||
      [];
    message.basicRoundRobin = (object.basicRoundRobin !== undefined && object.basicRoundRobin !== null)
      ? BasicRoundRobin.fromPartial(object.basicRoundRobin)
      : undefined;
    message.manualAssignment = (object.manualAssignment !== undefined && object.manualAssignment !== null)
      ? ManualAssignment.fromPartial(object.manualAssignment)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(WorkflowAssignmentOption.$type, WorkflowAssignmentOption);

function createBaseConditionalAssignment(): ConditionalAssignment {
  return { $type: "common.ConditionalAssignment", groupCondition: undefined, users: [] };
}

export const ConditionalAssignment = {
  $type: "common.ConditionalAssignment" as const,

  encode(message: ConditionalAssignment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupCondition !== undefined) {
      CompositeGroupCondition.encode(message.groupCondition, writer.uint32(10).fork()).ldelim();
    }
    if (message.users !== undefined && message.users.length !== 0) {
      for (const v of message.users) {
        WorkflowUser.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConditionalAssignment {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConditionalAssignment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groupCondition = CompositeGroupCondition.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.users!.push(WorkflowUser.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConditionalAssignment {
    return {
      $type: ConditionalAssignment.$type,
      groupCondition: isSet(object.groupCondition)
        ? CompositeGroupCondition.fromJSON(object.groupCondition)
        : undefined,
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => WorkflowUser.fromJSON(e)) : [],
    };
  },

  toJSON(message: ConditionalAssignment): unknown {
    const obj: any = {};
    if (message.groupCondition !== undefined) {
      obj.groupCondition = CompositeGroupCondition.toJSON(message.groupCondition);
    }
    if (message.users?.length) {
      obj.users = message.users.map((e) => WorkflowUser.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConditionalAssignment>, I>>(base?: I): ConditionalAssignment {
    return ConditionalAssignment.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConditionalAssignment>, I>>(object: I): ConditionalAssignment {
    const message = createBaseConditionalAssignment();
    message.groupCondition = (object.groupCondition !== undefined && object.groupCondition !== null)
      ? CompositeGroupCondition.fromPartial(object.groupCondition)
      : undefined;
    message.users = object.users?.map((e) => WorkflowUser.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ConditionalAssignment.$type, ConditionalAssignment);

function createBaseBasicRoundRobin(): BasicRoundRobin {
  return { $type: "common.BasicRoundRobin", numberOfTasks: 0, users: [] };
}

export const BasicRoundRobin = {
  $type: "common.BasicRoundRobin" as const,

  encode(message: BasicRoundRobin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.numberOfTasks !== undefined && message.numberOfTasks !== 0) {
      writer.uint32(8).int32(message.numberOfTasks);
    }
    if (message.users !== undefined && message.users.length !== 0) {
      for (const v of message.users) {
        WorkflowUser.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BasicRoundRobin {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBasicRoundRobin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.numberOfTasks = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.users!.push(WorkflowUser.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BasicRoundRobin {
    return {
      $type: BasicRoundRobin.$type,
      numberOfTasks: isSet(object.numberOfTasks) ? globalThis.Number(object.numberOfTasks) : 0,
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => WorkflowUser.fromJSON(e)) : [],
    };
  },

  toJSON(message: BasicRoundRobin): unknown {
    const obj: any = {};
    if (message.numberOfTasks !== undefined && message.numberOfTasks !== 0) {
      obj.numberOfTasks = Math.round(message.numberOfTasks);
    }
    if (message.users?.length) {
      obj.users = message.users.map((e) => WorkflowUser.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BasicRoundRobin>, I>>(base?: I): BasicRoundRobin {
    return BasicRoundRobin.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BasicRoundRobin>, I>>(object: I): BasicRoundRobin {
    const message = createBaseBasicRoundRobin();
    message.numberOfTasks = object.numberOfTasks ?? 0;
    message.users = object.users?.map((e) => WorkflowUser.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(BasicRoundRobin.$type, BasicRoundRobin);

function createBaseManualAssignment(): ManualAssignment {
  return { $type: "common.ManualAssignment", users: [] };
}

export const ManualAssignment = {
  $type: "common.ManualAssignment" as const,

  encode(message: ManualAssignment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.users !== undefined && message.users.length !== 0) {
      for (const v of message.users) {
        WorkflowUser.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ManualAssignment {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManualAssignment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.users!.push(WorkflowUser.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ManualAssignment {
    return {
      $type: ManualAssignment.$type,
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => WorkflowUser.fromJSON(e)) : [],
    };
  },

  toJSON(message: ManualAssignment): unknown {
    const obj: any = {};
    if (message.users?.length) {
      obj.users = message.users.map((e) => WorkflowUser.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ManualAssignment>, I>>(base?: I): ManualAssignment {
    return ManualAssignment.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ManualAssignment>, I>>(object: I): ManualAssignment {
    const message = createBaseManualAssignment();
    message.users = object.users?.map((e) => WorkflowUser.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ManualAssignment.$type, ManualAssignment);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
