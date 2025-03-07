/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "common";

export interface Hyperparameter {
  $type?: "common.Hyperparameter";
  /** Resource name of hyperparamerter => hyperparameter/{hyperparameter_id} */
  name?: string | undefined;
  displayName?:
    | string
    | undefined;
  /**
   * FewShotTunableConfig is used to configure the few-shot model,
   * pipeline and temperature.
   */
  fewShotTunableConfig?:
    | FewShotTunableConfig
    | undefined;
  /**
   * DocumentClassificationTunableConfig is used to configure the document
   * classification model.
   */
  documentClassificationTunableConfig?:
    | DocumentClassificationTunableConfig
    | undefined;
  /**
   * FetchSimilarDocumentsTunableConfig is used to configure the fetch similar
   * documents count and model type.
   */
  fetchSimilarDocumentsTunableConfig?: FetchSimilarDocumentsTunableConfig | undefined;
}

export interface FewShotTunableConfig {
  $type?: "common.FewShotTunableConfig";
  temperature?:
    | string
    | undefined;
  /** Specifies the parameters to be used for Nucleus Sampling. */
  nucleusSamplingParameters?: NucleusSamplingParameters | undefined;
  maxChunkSize?: number | undefined;
  pipelineType?: string | undefined;
  modelName?: string | undefined;
  modelFamily?:
    | string
    | undefined;
  /** ModelInfo used to specify the transcription and extraction model. */
  modelInfo?: ModelInfo | undefined;
  removeEntitiesWithoutBbox?:
    | boolean
    | undefined;
  /**
   * EntityCalibration is used to specify the calibration maps for simple and
   * child entities.
   */
  simpleEntityCalibration?: EntityCalibration[] | undefined;
  childEntityCalibration?:
    | EntityCalibration[]
    | undefined;
  /** If set, disables rolling the LLM token output */
  disableRollingLlmTokenOutput?:
    | boolean
    | undefined;
  /** If set, disables the REM fallback searching approach */
  disableRemFallback?:
    | boolean
    | undefined;
  /**
   * Maximum number of times to retry getting a complete answer from the LLM if
   * it gets cut off mid-response
   */
  maxAnswerRolls?:
    | number
    | undefined;
  /** Extra rules for entity extraction quality improvements */
  extraRules?: string | undefined;
}

export interface DocumentClassificationTunableConfig {
  $type?: "common.DocumentClassificationTunableConfig";
  modelName?: string | undefined;
  modelFamily?: string | undefined;
  pipelineType?: string | undefined;
  labelToDescriptionMap?: { [key: string]: string } | undefined;
}

export interface DocumentClassificationTunableConfigLabelToDescriptionMapEntry {
  $type?: "common.DocumentClassificationTunableConfig.LabelToDescriptionMapEntry";
  key: string;
  value: string;
}

export interface FetchSimilarDocumentsTunableConfig {
  $type?: "common.FetchSimilarDocumentsTunableConfig";
  fetchCount?: number | undefined;
  modelName?: string | undefined;
  modelFamily?: string | undefined;
}

export interface NucleusSamplingParameters {
  $type?: "common.NucleusSamplingParameters";
  topP?: string | undefined;
  topK?: number | undefined;
  candidateCount?: number | undefined;
}

export interface ModelSpec {
  $type?: "common.ModelSpec";
  modelName?: string | undefined;
}

export interface ModelInfo {
  $type?: "common.ModelInfo";
  transcriptionModelSpec?: ModelSpec | undefined;
  extractionModelSpec?: ModelSpec | undefined;
}

export interface EntityCalibration {
  $type?: "common.EntityCalibration";
  uncalibratedConfidence?: number | undefined;
  calibratedConfidence?: number | undefined;
}

function createBaseHyperparameter(): Hyperparameter {
  return {
    $type: "common.Hyperparameter",
    name: "",
    displayName: "",
    fewShotTunableConfig: undefined,
    documentClassificationTunableConfig: undefined,
    fetchSimilarDocumentsTunableConfig: undefined,
  };
}

export const Hyperparameter = {
  $type: "common.Hyperparameter" as const,

  encode(message: Hyperparameter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.fewShotTunableConfig !== undefined) {
      FewShotTunableConfig.encode(message.fewShotTunableConfig, writer.uint32(26).fork()).ldelim();
    }
    if (message.documentClassificationTunableConfig !== undefined) {
      DocumentClassificationTunableConfig.encode(message.documentClassificationTunableConfig, writer.uint32(34).fork())
        .ldelim();
    }
    if (message.fetchSimilarDocumentsTunableConfig !== undefined) {
      FetchSimilarDocumentsTunableConfig.encode(message.fetchSimilarDocumentsTunableConfig, writer.uint32(42).fork())
        .ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Hyperparameter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHyperparameter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.fewShotTunableConfig = FewShotTunableConfig.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.documentClassificationTunableConfig = DocumentClassificationTunableConfig.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.fetchSimilarDocumentsTunableConfig = FetchSimilarDocumentsTunableConfig.decode(
            reader,
            reader.uint32(),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Hyperparameter {
    return {
      $type: Hyperparameter.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      fewShotTunableConfig: isSet(object.fewShotTunableConfig)
        ? FewShotTunableConfig.fromJSON(object.fewShotTunableConfig)
        : undefined,
      documentClassificationTunableConfig: isSet(object.documentClassificationTunableConfig)
        ? DocumentClassificationTunableConfig.fromJSON(object.documentClassificationTunableConfig)
        : undefined,
      fetchSimilarDocumentsTunableConfig: isSet(object.fetchSimilarDocumentsTunableConfig)
        ? FetchSimilarDocumentsTunableConfig.fromJSON(object.fetchSimilarDocumentsTunableConfig)
        : undefined,
    };
  },

  toJSON(message: Hyperparameter): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.fewShotTunableConfig !== undefined) {
      obj.fewShotTunableConfig = FewShotTunableConfig.toJSON(message.fewShotTunableConfig);
    }
    if (message.documentClassificationTunableConfig !== undefined) {
      obj.documentClassificationTunableConfig = DocumentClassificationTunableConfig.toJSON(
        message.documentClassificationTunableConfig,
      );
    }
    if (message.fetchSimilarDocumentsTunableConfig !== undefined) {
      obj.fetchSimilarDocumentsTunableConfig = FetchSimilarDocumentsTunableConfig.toJSON(
        message.fetchSimilarDocumentsTunableConfig,
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Hyperparameter>, I>>(base?: I): Hyperparameter {
    return Hyperparameter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Hyperparameter>, I>>(object: I): Hyperparameter {
    const message = createBaseHyperparameter();
    message.name = object.name ?? "";
    message.displayName = object.displayName ?? "";
    message.fewShotTunableConfig = (object.fewShotTunableConfig !== undefined && object.fewShotTunableConfig !== null)
      ? FewShotTunableConfig.fromPartial(object.fewShotTunableConfig)
      : undefined;
    message.documentClassificationTunableConfig =
      (object.documentClassificationTunableConfig !== undefined && object.documentClassificationTunableConfig !== null)
        ? DocumentClassificationTunableConfig.fromPartial(object.documentClassificationTunableConfig)
        : undefined;
    message.fetchSimilarDocumentsTunableConfig =
      (object.fetchSimilarDocumentsTunableConfig !== undefined && object.fetchSimilarDocumentsTunableConfig !== null)
        ? FetchSimilarDocumentsTunableConfig.fromPartial(object.fetchSimilarDocumentsTunableConfig)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(Hyperparameter.$type, Hyperparameter);

function createBaseFewShotTunableConfig(): FewShotTunableConfig {
  return {
    $type: "common.FewShotTunableConfig",
    temperature: undefined,
    nucleusSamplingParameters: undefined,
    maxChunkSize: undefined,
    pipelineType: "",
    modelName: "",
    modelFamily: "",
    modelInfo: undefined,
    removeEntitiesWithoutBbox: undefined,
    simpleEntityCalibration: [],
    childEntityCalibration: [],
    disableRollingLlmTokenOutput: undefined,
    disableRemFallback: undefined,
    maxAnswerRolls: undefined,
    extraRules: undefined,
  };
}

export const FewShotTunableConfig = {
  $type: "common.FewShotTunableConfig" as const,

  encode(message: FewShotTunableConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.temperature !== undefined) {
      writer.uint32(10).string(message.temperature);
    }
    if (message.nucleusSamplingParameters !== undefined) {
      NucleusSamplingParameters.encode(message.nucleusSamplingParameters, writer.uint32(18).fork()).ldelim();
    }
    if (message.maxChunkSize !== undefined) {
      writer.uint32(24).int32(message.maxChunkSize);
    }
    if (message.pipelineType !== undefined && message.pipelineType !== "") {
      writer.uint32(34).string(message.pipelineType);
    }
    if (message.modelName !== undefined && message.modelName !== "") {
      writer.uint32(42).string(message.modelName);
    }
    if (message.modelFamily !== undefined && message.modelFamily !== "") {
      writer.uint32(50).string(message.modelFamily);
    }
    if (message.modelInfo !== undefined) {
      ModelInfo.encode(message.modelInfo, writer.uint32(58).fork()).ldelim();
    }
    if (message.removeEntitiesWithoutBbox !== undefined) {
      writer.uint32(64).bool(message.removeEntitiesWithoutBbox);
    }
    if (message.simpleEntityCalibration !== undefined && message.simpleEntityCalibration.length !== 0) {
      for (const v of message.simpleEntityCalibration) {
        EntityCalibration.encode(v!, writer.uint32(74).fork()).ldelim();
      }
    }
    if (message.childEntityCalibration !== undefined && message.childEntityCalibration.length !== 0) {
      for (const v of message.childEntityCalibration) {
        EntityCalibration.encode(v!, writer.uint32(82).fork()).ldelim();
      }
    }
    if (message.disableRollingLlmTokenOutput !== undefined) {
      writer.uint32(88).bool(message.disableRollingLlmTokenOutput);
    }
    if (message.disableRemFallback !== undefined) {
      writer.uint32(96).bool(message.disableRemFallback);
    }
    if (message.maxAnswerRolls !== undefined) {
      writer.uint32(104).int32(message.maxAnswerRolls);
    }
    if (message.extraRules !== undefined) {
      writer.uint32(114).string(message.extraRules);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FewShotTunableConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFewShotTunableConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.temperature = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nucleusSamplingParameters = NucleusSamplingParameters.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.maxChunkSize = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.pipelineType = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.modelName = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.modelFamily = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.modelInfo = ModelInfo.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.removeEntitiesWithoutBbox = reader.bool();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.simpleEntityCalibration!.push(EntityCalibration.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.childEntityCalibration!.push(EntityCalibration.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.disableRollingLlmTokenOutput = reader.bool();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.disableRemFallback = reader.bool();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.maxAnswerRolls = reader.int32();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.extraRules = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FewShotTunableConfig {
    return {
      $type: FewShotTunableConfig.$type,
      temperature: isSet(object.temperature) ? globalThis.String(object.temperature) : undefined,
      nucleusSamplingParameters: isSet(object.nucleusSamplingParameters)
        ? NucleusSamplingParameters.fromJSON(object.nucleusSamplingParameters)
        : undefined,
      maxChunkSize: isSet(object.maxChunkSize) ? globalThis.Number(object.maxChunkSize) : undefined,
      pipelineType: isSet(object.pipelineType) ? globalThis.String(object.pipelineType) : "",
      modelName: isSet(object.modelName) ? globalThis.String(object.modelName) : "",
      modelFamily: isSet(object.modelFamily) ? globalThis.String(object.modelFamily) : "",
      modelInfo: isSet(object.modelInfo) ? ModelInfo.fromJSON(object.modelInfo) : undefined,
      removeEntitiesWithoutBbox: isSet(object.removeEntitiesWithoutBbox)
        ? globalThis.Boolean(object.removeEntitiesWithoutBbox)
        : undefined,
      simpleEntityCalibration: globalThis.Array.isArray(object?.simpleEntityCalibration)
        ? object.simpleEntityCalibration.map((e: any) => EntityCalibration.fromJSON(e))
        : [],
      childEntityCalibration: globalThis.Array.isArray(object?.childEntityCalibration)
        ? object.childEntityCalibration.map((e: any) => EntityCalibration.fromJSON(e))
        : [],
      disableRollingLlmTokenOutput: isSet(object.disableRollingLlmTokenOutput)
        ? globalThis.Boolean(object.disableRollingLlmTokenOutput)
        : undefined,
      disableRemFallback: isSet(object.disableRemFallback) ? globalThis.Boolean(object.disableRemFallback) : undefined,
      maxAnswerRolls: isSet(object.maxAnswerRolls) ? globalThis.Number(object.maxAnswerRolls) : undefined,
      extraRules: isSet(object.extraRules) ? globalThis.String(object.extraRules) : undefined,
    };
  },

  toJSON(message: FewShotTunableConfig): unknown {
    const obj: any = {};
    if (message.temperature !== undefined) {
      obj.temperature = message.temperature;
    }
    if (message.nucleusSamplingParameters !== undefined) {
      obj.nucleusSamplingParameters = NucleusSamplingParameters.toJSON(message.nucleusSamplingParameters);
    }
    if (message.maxChunkSize !== undefined) {
      obj.maxChunkSize = Math.round(message.maxChunkSize);
    }
    if (message.pipelineType !== undefined && message.pipelineType !== "") {
      obj.pipelineType = message.pipelineType;
    }
    if (message.modelName !== undefined && message.modelName !== "") {
      obj.modelName = message.modelName;
    }
    if (message.modelFamily !== undefined && message.modelFamily !== "") {
      obj.modelFamily = message.modelFamily;
    }
    if (message.modelInfo !== undefined) {
      obj.modelInfo = ModelInfo.toJSON(message.modelInfo);
    }
    if (message.removeEntitiesWithoutBbox !== undefined) {
      obj.removeEntitiesWithoutBbox = message.removeEntitiesWithoutBbox;
    }
    if (message.simpleEntityCalibration?.length) {
      obj.simpleEntityCalibration = message.simpleEntityCalibration.map((e) => EntityCalibration.toJSON(e));
    }
    if (message.childEntityCalibration?.length) {
      obj.childEntityCalibration = message.childEntityCalibration.map((e) => EntityCalibration.toJSON(e));
    }
    if (message.disableRollingLlmTokenOutput !== undefined) {
      obj.disableRollingLlmTokenOutput = message.disableRollingLlmTokenOutput;
    }
    if (message.disableRemFallback !== undefined) {
      obj.disableRemFallback = message.disableRemFallback;
    }
    if (message.maxAnswerRolls !== undefined) {
      obj.maxAnswerRolls = Math.round(message.maxAnswerRolls);
    }
    if (message.extraRules !== undefined) {
      obj.extraRules = message.extraRules;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FewShotTunableConfig>, I>>(base?: I): FewShotTunableConfig {
    return FewShotTunableConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FewShotTunableConfig>, I>>(object: I): FewShotTunableConfig {
    const message = createBaseFewShotTunableConfig();
    message.temperature = object.temperature ?? undefined;
    message.nucleusSamplingParameters =
      (object.nucleusSamplingParameters !== undefined && object.nucleusSamplingParameters !== null)
        ? NucleusSamplingParameters.fromPartial(object.nucleusSamplingParameters)
        : undefined;
    message.maxChunkSize = object.maxChunkSize ?? undefined;
    message.pipelineType = object.pipelineType ?? "";
    message.modelName = object.modelName ?? "";
    message.modelFamily = object.modelFamily ?? "";
    message.modelInfo = (object.modelInfo !== undefined && object.modelInfo !== null)
      ? ModelInfo.fromPartial(object.modelInfo)
      : undefined;
    message.removeEntitiesWithoutBbox = object.removeEntitiesWithoutBbox ?? undefined;
    message.simpleEntityCalibration = object.simpleEntityCalibration?.map((e) => EntityCalibration.fromPartial(e)) ||
      [];
    message.childEntityCalibration = object.childEntityCalibration?.map((e) => EntityCalibration.fromPartial(e)) || [];
    message.disableRollingLlmTokenOutput = object.disableRollingLlmTokenOutput ?? undefined;
    message.disableRemFallback = object.disableRemFallback ?? undefined;
    message.maxAnswerRolls = object.maxAnswerRolls ?? undefined;
    message.extraRules = object.extraRules ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(FewShotTunableConfig.$type, FewShotTunableConfig);

function createBaseDocumentClassificationTunableConfig(): DocumentClassificationTunableConfig {
  return {
    $type: "common.DocumentClassificationTunableConfig",
    modelName: "",
    modelFamily: "",
    pipelineType: "",
    labelToDescriptionMap: {},
  };
}

export const DocumentClassificationTunableConfig = {
  $type: "common.DocumentClassificationTunableConfig" as const,

  encode(message: DocumentClassificationTunableConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.modelName !== undefined && message.modelName !== "") {
      writer.uint32(10).string(message.modelName);
    }
    if (message.modelFamily !== undefined && message.modelFamily !== "") {
      writer.uint32(18).string(message.modelFamily);
    }
    if (message.pipelineType !== undefined && message.pipelineType !== "") {
      writer.uint32(26).string(message.pipelineType);
    }
    Object.entries(message.labelToDescriptionMap || {}).forEach(([key, value]) => {
      DocumentClassificationTunableConfigLabelToDescriptionMapEntry.encode({
        $type: "common.DocumentClassificationTunableConfig.LabelToDescriptionMapEntry",
        key: key as any,
        value,
      }, writer.uint32(34).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentClassificationTunableConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentClassificationTunableConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.modelName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.modelFamily = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pipelineType = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = DocumentClassificationTunableConfigLabelToDescriptionMapEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.labelToDescriptionMap![entry4.key] = entry4.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentClassificationTunableConfig {
    return {
      $type: DocumentClassificationTunableConfig.$type,
      modelName: isSet(object.modelName) ? globalThis.String(object.modelName) : "",
      modelFamily: isSet(object.modelFamily) ? globalThis.String(object.modelFamily) : "",
      pipelineType: isSet(object.pipelineType) ? globalThis.String(object.pipelineType) : "",
      labelToDescriptionMap: isObject(object.labelToDescriptionMap)
        ? Object.entries(object.labelToDescriptionMap).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: DocumentClassificationTunableConfig): unknown {
    const obj: any = {};
    if (message.modelName !== undefined && message.modelName !== "") {
      obj.modelName = message.modelName;
    }
    if (message.modelFamily !== undefined && message.modelFamily !== "") {
      obj.modelFamily = message.modelFamily;
    }
    if (message.pipelineType !== undefined && message.pipelineType !== "") {
      obj.pipelineType = message.pipelineType;
    }
    if (message.labelToDescriptionMap) {
      const entries = Object.entries(message.labelToDescriptionMap);
      if (entries.length > 0) {
        obj.labelToDescriptionMap = {};
        entries.forEach(([k, v]) => {
          obj.labelToDescriptionMap[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentClassificationTunableConfig>, I>>(
    base?: I,
  ): DocumentClassificationTunableConfig {
    return DocumentClassificationTunableConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentClassificationTunableConfig>, I>>(
    object: I,
  ): DocumentClassificationTunableConfig {
    const message = createBaseDocumentClassificationTunableConfig();
    message.modelName = object.modelName ?? "";
    message.modelFamily = object.modelFamily ?? "";
    message.pipelineType = object.pipelineType ?? "";
    message.labelToDescriptionMap = Object.entries(object.labelToDescriptionMap ?? {}).reduce<
      { [key: string]: string }
    >((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

messageTypeRegistry.set(DocumentClassificationTunableConfig.$type, DocumentClassificationTunableConfig);

function createBaseDocumentClassificationTunableConfigLabelToDescriptionMapEntry(): DocumentClassificationTunableConfigLabelToDescriptionMapEntry {
  return { $type: "common.DocumentClassificationTunableConfig.LabelToDescriptionMapEntry", key: "", value: "" };
}

export const DocumentClassificationTunableConfigLabelToDescriptionMapEntry = {
  $type: "common.DocumentClassificationTunableConfig.LabelToDescriptionMapEntry" as const,

  encode(
    message: DocumentClassificationTunableConfigLabelToDescriptionMapEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): DocumentClassificationTunableConfigLabelToDescriptionMapEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentClassificationTunableConfigLabelToDescriptionMapEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentClassificationTunableConfigLabelToDescriptionMapEntry {
    return {
      $type: DocumentClassificationTunableConfigLabelToDescriptionMapEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: DocumentClassificationTunableConfigLabelToDescriptionMapEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentClassificationTunableConfigLabelToDescriptionMapEntry>, I>>(
    base?: I,
  ): DocumentClassificationTunableConfigLabelToDescriptionMapEntry {
    return DocumentClassificationTunableConfigLabelToDescriptionMapEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentClassificationTunableConfigLabelToDescriptionMapEntry>, I>>(
    object: I,
  ): DocumentClassificationTunableConfigLabelToDescriptionMapEntry {
    const message = createBaseDocumentClassificationTunableConfigLabelToDescriptionMapEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

messageTypeRegistry.set(
  DocumentClassificationTunableConfigLabelToDescriptionMapEntry.$type,
  DocumentClassificationTunableConfigLabelToDescriptionMapEntry,
);

function createBaseFetchSimilarDocumentsTunableConfig(): FetchSimilarDocumentsTunableConfig {
  return { $type: "common.FetchSimilarDocumentsTunableConfig", fetchCount: undefined, modelName: "", modelFamily: "" };
}

export const FetchSimilarDocumentsTunableConfig = {
  $type: "common.FetchSimilarDocumentsTunableConfig" as const,

  encode(message: FetchSimilarDocumentsTunableConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fetchCount !== undefined) {
      writer.uint32(8).int32(message.fetchCount);
    }
    if (message.modelName !== undefined && message.modelName !== "") {
      writer.uint32(18).string(message.modelName);
    }
    if (message.modelFamily !== undefined && message.modelFamily !== "") {
      writer.uint32(26).string(message.modelFamily);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FetchSimilarDocumentsTunableConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFetchSimilarDocumentsTunableConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.fetchCount = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.modelName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.modelFamily = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FetchSimilarDocumentsTunableConfig {
    return {
      $type: FetchSimilarDocumentsTunableConfig.$type,
      fetchCount: isSet(object.fetchCount) ? globalThis.Number(object.fetchCount) : undefined,
      modelName: isSet(object.modelName) ? globalThis.String(object.modelName) : "",
      modelFamily: isSet(object.modelFamily) ? globalThis.String(object.modelFamily) : "",
    };
  },

  toJSON(message: FetchSimilarDocumentsTunableConfig): unknown {
    const obj: any = {};
    if (message.fetchCount !== undefined) {
      obj.fetchCount = Math.round(message.fetchCount);
    }
    if (message.modelName !== undefined && message.modelName !== "") {
      obj.modelName = message.modelName;
    }
    if (message.modelFamily !== undefined && message.modelFamily !== "") {
      obj.modelFamily = message.modelFamily;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FetchSimilarDocumentsTunableConfig>, I>>(
    base?: I,
  ): FetchSimilarDocumentsTunableConfig {
    return FetchSimilarDocumentsTunableConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FetchSimilarDocumentsTunableConfig>, I>>(
    object: I,
  ): FetchSimilarDocumentsTunableConfig {
    const message = createBaseFetchSimilarDocumentsTunableConfig();
    message.fetchCount = object.fetchCount ?? undefined;
    message.modelName = object.modelName ?? "";
    message.modelFamily = object.modelFamily ?? "";
    return message;
  },
};

messageTypeRegistry.set(FetchSimilarDocumentsTunableConfig.$type, FetchSimilarDocumentsTunableConfig);

function createBaseNucleusSamplingParameters(): NucleusSamplingParameters {
  return { $type: "common.NucleusSamplingParameters", topP: undefined, topK: undefined, candidateCount: undefined };
}

export const NucleusSamplingParameters = {
  $type: "common.NucleusSamplingParameters" as const,

  encode(message: NucleusSamplingParameters, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.topP !== undefined) {
      writer.uint32(10).string(message.topP);
    }
    if (message.topK !== undefined) {
      writer.uint32(16).int32(message.topK);
    }
    if (message.candidateCount !== undefined) {
      writer.uint32(24).int32(message.candidateCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NucleusSamplingParameters {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNucleusSamplingParameters();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topP = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.topK = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.candidateCount = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NucleusSamplingParameters {
    return {
      $type: NucleusSamplingParameters.$type,
      topP: isSet(object.topP) ? globalThis.String(object.topP) : undefined,
      topK: isSet(object.topK) ? globalThis.Number(object.topK) : undefined,
      candidateCount: isSet(object.candidateCount) ? globalThis.Number(object.candidateCount) : undefined,
    };
  },

  toJSON(message: NucleusSamplingParameters): unknown {
    const obj: any = {};
    if (message.topP !== undefined) {
      obj.topP = message.topP;
    }
    if (message.topK !== undefined) {
      obj.topK = Math.round(message.topK);
    }
    if (message.candidateCount !== undefined) {
      obj.candidateCount = Math.round(message.candidateCount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NucleusSamplingParameters>, I>>(base?: I): NucleusSamplingParameters {
    return NucleusSamplingParameters.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NucleusSamplingParameters>, I>>(object: I): NucleusSamplingParameters {
    const message = createBaseNucleusSamplingParameters();
    message.topP = object.topP ?? undefined;
    message.topK = object.topK ?? undefined;
    message.candidateCount = object.candidateCount ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(NucleusSamplingParameters.$type, NucleusSamplingParameters);

function createBaseModelSpec(): ModelSpec {
  return { $type: "common.ModelSpec", modelName: "" };
}

export const ModelSpec = {
  $type: "common.ModelSpec" as const,

  encode(message: ModelSpec, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.modelName !== undefined && message.modelName !== "") {
      writer.uint32(10).string(message.modelName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModelSpec {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModelSpec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.modelName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModelSpec {
    return { $type: ModelSpec.$type, modelName: isSet(object.modelName) ? globalThis.String(object.modelName) : "" };
  },

  toJSON(message: ModelSpec): unknown {
    const obj: any = {};
    if (message.modelName !== undefined && message.modelName !== "") {
      obj.modelName = message.modelName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ModelSpec>, I>>(base?: I): ModelSpec {
    return ModelSpec.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ModelSpec>, I>>(object: I): ModelSpec {
    const message = createBaseModelSpec();
    message.modelName = object.modelName ?? "";
    return message;
  },
};

messageTypeRegistry.set(ModelSpec.$type, ModelSpec);

function createBaseModelInfo(): ModelInfo {
  return { $type: "common.ModelInfo", transcriptionModelSpec: undefined, extractionModelSpec: undefined };
}

export const ModelInfo = {
  $type: "common.ModelInfo" as const,

  encode(message: ModelInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.transcriptionModelSpec !== undefined) {
      ModelSpec.encode(message.transcriptionModelSpec, writer.uint32(10).fork()).ldelim();
    }
    if (message.extractionModelSpec !== undefined) {
      ModelSpec.encode(message.extractionModelSpec, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModelInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModelInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.transcriptionModelSpec = ModelSpec.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.extractionModelSpec = ModelSpec.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModelInfo {
    return {
      $type: ModelInfo.$type,
      transcriptionModelSpec: isSet(object.transcriptionModelSpec)
        ? ModelSpec.fromJSON(object.transcriptionModelSpec)
        : undefined,
      extractionModelSpec: isSet(object.extractionModelSpec)
        ? ModelSpec.fromJSON(object.extractionModelSpec)
        : undefined,
    };
  },

  toJSON(message: ModelInfo): unknown {
    const obj: any = {};
    if (message.transcriptionModelSpec !== undefined) {
      obj.transcriptionModelSpec = ModelSpec.toJSON(message.transcriptionModelSpec);
    }
    if (message.extractionModelSpec !== undefined) {
      obj.extractionModelSpec = ModelSpec.toJSON(message.extractionModelSpec);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ModelInfo>, I>>(base?: I): ModelInfo {
    return ModelInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ModelInfo>, I>>(object: I): ModelInfo {
    const message = createBaseModelInfo();
    message.transcriptionModelSpec =
      (object.transcriptionModelSpec !== undefined && object.transcriptionModelSpec !== null)
        ? ModelSpec.fromPartial(object.transcriptionModelSpec)
        : undefined;
    message.extractionModelSpec = (object.extractionModelSpec !== undefined && object.extractionModelSpec !== null)
      ? ModelSpec.fromPartial(object.extractionModelSpec)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ModelInfo.$type, ModelInfo);

function createBaseEntityCalibration(): EntityCalibration {
  return { $type: "common.EntityCalibration", uncalibratedConfidence: 0, calibratedConfidence: 0 };
}

export const EntityCalibration = {
  $type: "common.EntityCalibration" as const,

  encode(message: EntityCalibration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uncalibratedConfidence !== undefined && message.uncalibratedConfidence !== 0) {
      writer.uint32(13).float(message.uncalibratedConfidence);
    }
    if (message.calibratedConfidence !== undefined && message.calibratedConfidence !== 0) {
      writer.uint32(21).float(message.calibratedConfidence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EntityCalibration {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntityCalibration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.uncalibratedConfidence = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.calibratedConfidence = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EntityCalibration {
    return {
      $type: EntityCalibration.$type,
      uncalibratedConfidence: isSet(object.uncalibratedConfidence)
        ? globalThis.Number(object.uncalibratedConfidence)
        : 0,
      calibratedConfidence: isSet(object.calibratedConfidence) ? globalThis.Number(object.calibratedConfidence) : 0,
    };
  },

  toJSON(message: EntityCalibration): unknown {
    const obj: any = {};
    if (message.uncalibratedConfidence !== undefined && message.uncalibratedConfidence !== 0) {
      obj.uncalibratedConfidence = message.uncalibratedConfidence;
    }
    if (message.calibratedConfidence !== undefined && message.calibratedConfidence !== 0) {
      obj.calibratedConfidence = message.calibratedConfidence;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EntityCalibration>, I>>(base?: I): EntityCalibration {
    return EntityCalibration.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EntityCalibration>, I>>(object: I): EntityCalibration {
    const message = createBaseEntityCalibration();
    message.uncalibratedConfidence = object.uncalibratedConfidence ?? 0;
    message.calibratedConfidence = object.calibratedConfidence ?? 0;
    return message;
  },
};

messageTypeRegistry.set(EntityCalibration.$type, EntityCalibration);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
