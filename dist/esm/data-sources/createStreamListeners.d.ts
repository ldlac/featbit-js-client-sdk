import { IDataSourceUpdates } from "../store/IDataSourceUpdates";
import { ILogger } from "../logging/ILogger";
import { VoidFunction } from "../utils/VoidFunction";
import { deserializeAll, deserializePatch, IPatchData, Flags } from "../store/serialization";
import { EventName, ProcessStreamResponse } from "../data-sync/types";
export declare const createPutListener: (dataSourceUpdates: IDataSourceUpdates, logger?: ILogger, onPutCompleteHandler?: VoidFunction) => {
    deserializeData: typeof deserializeAll;
    processJson: (userKeyId: string, { flags }: Flags) => Promise<void>;
};
export declare const createPatchListener: (dataSourceUpdates: IDataSourceUpdates, logger?: ILogger, onPatchCompleteHandler?: VoidFunction) => {
    deserializeData: typeof deserializePatch;
    processJson: (userKeyId: string, data: IPatchData[]) => Promise<void>;
};
export declare const createStreamListeners: (dataSourceUpdates: IDataSourceUpdates, logger?: ILogger, onCompleteHandlers?: {
    put?: VoidFunction;
    patch?: VoidFunction;
    delete?: VoidFunction;
}) => Map<EventName, ProcessStreamResponse>;
//# sourceMappingURL=createStreamListeners.d.ts.map