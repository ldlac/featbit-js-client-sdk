import { IOptions } from "./options/IOptions";
import { ILogger } from "./logging/ILogger";
import { IValidatedOptions } from "./options/IValidatedOptions";
import { IStore } from "./platform/IStore";
import { IClientContext } from "./options/IClientContext";
import { IDataSynchronizer } from "./data-sync/IDataSynchronizer";
import { IDataSourceUpdates } from "./store/IDataSourceUpdates";
import { VoidFunction } from "./utils/VoidFunction";
import { IBootstrapProvider } from "./bootstrap/IBootstrapProvider";
import { DataSyncModeEnum } from "./data-sync/DataSyncMode";
import { IUser } from "./options/IUser";
/**
 * @internal
 */
export declare const defaultValues: IValidatedOptions;
export default class Configuration {
    readonly startWaitTime: number;
    readonly sdkKey: string;
    readonly streamingUri: string;
    readonly pollingUri: string;
    readonly eventsUri: string;
    readonly webSocketPingInterval: number;
    readonly logger?: ILogger;
    readonly flushInterval: number;
    readonly maxEventsInQueue: number;
    readonly pollingInterval: number;
    readonly offline: boolean;
    readonly dataSyncMode: DataSyncModeEnum;
    readonly bootstrapProvider: IBootstrapProvider;
    user: IUser;
    readonly storeFactory: (clientContext: IClientContext) => IStore;
    readonly dataSynchronizerFactory?: (clientContext: IClientContext, store: IStore, dataSourceUpdates: IDataSourceUpdates, initSuccessHandler: VoidFunction, errorHandler?: (e: Error) => void) => IDataSynchronizer;
    constructor(options?: IOptions);
}
//# sourceMappingURL=Configuration.d.ts.map