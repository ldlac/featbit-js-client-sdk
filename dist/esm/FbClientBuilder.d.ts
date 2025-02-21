import { IFbClient } from "./IFbClient";
import { IOptions } from "./options/IOptions";
import { IDataSynchronizer } from "./data-sync/IDataSynchronizer";
import { IClientContext } from "./options/IClientContext";
import { IDataSourceUpdates } from "./store/IDataSourceUpdates";
import { VoidFunction } from "./utils/VoidFunction";
import { ILogger } from "./logging/ILogger";
import { DataSyncModeEnum } from "./data-sync/DataSyncMode";
import { IUser } from "./options/IUser";
import { IFlagBase } from "./evaluation";
import { IPlatform } from "./platform";
/**
 * Creates an instance of the FeatBit client.
 *
 * Applications should instantiate a single instance for the lifetime of the application.
 * The client will begin attempting to connect to FeatBit as soon as it is created. To
 * determine when it is ready to use, call {@link IFbClient.waitForInitialization}, or register an
 * event listener for the `"ready"` event using {@link IFbClient.on}.
 *
 * **Important:** Do **not** try to instantiate `FbClient` with its constructor
 * (`new FbClientNode()`); the SDK does not currently support
 * this.
 *
 * @return
 *   The new {@link IFbClient} instance.
 */
export declare class FbClientBuilder {
    private _options;
    private _platform;
    constructor(options?: IOptions);
    /**
     * Creates a new instance of the FeatBit client.
     */
    build(): IFbClient;
    platform(platform: IPlatform | undefined): FbClientBuilder;
    /**
     * Refer to {@link IOptions.startWaitTime}.
     */
    startWaitTime(startWaitTime: number): FbClientBuilder;
    /**
     * Refer to {@link IOptions.sdkKey}.
     */
    sdkKey(sdkKey: string): FbClientBuilder;
    /**
     * Refer to {@link IOptions.user}.
     */
    user(user: IUser): FbClientBuilder;
    /**
     * Refer to {@link IOptions.streamingUri}.
     */
    streamingUri(streamingUri: string): FbClientBuilder;
    /**
     * Refer to {@link IOptions.pollingUri}.
     */
    pollingUri(pollingUri: string): FbClientBuilder;
    /**
     * Refer to {@link IOptions.eventsUri}.
     */
    eventsUri(eventsUri: string): FbClientBuilder;
    /**
     * Refer to {@link IOptions.dataSyncMode}.
     */
    dataSyncMode(mode: DataSyncModeEnum): FbClientBuilder;
    /**
     * Refer to {@link IOptions.pollingInterval}.
     */
    pollingInterval(pollingInterval: number): FbClientBuilder;
    /**
     * Refer to {@link IOptions.flushInterval}.
     */
    flushInterval(flushInterval: number): FbClientBuilder;
    /**
     * Refer to {@link IOptions.maxEventsInQueue}.
     */
    maxEventsInQueue(maxEventsInQueue: number): FbClientBuilder;
    /**
     * Refer to {@link IOptions.logger}.
     */
    logger(logger: ILogger): FbClientBuilder;
    /**
     * Refer to {@link IOptions.offline}.
     */
    offline(offline: boolean): FbClientBuilder;
    /**
     * Use the JsonBootstrapProvider.
     */
    bootstrap(flags: IFlagBase[]): FbClientBuilder;
    /**
     * Refer to {@link IOptions.dataSynchronizer}.
     */
    dataSynchronizer(dataSynchronizer: IDataSynchronizer | ((clientContext: IClientContext, dataSourceUpdates: IDataSourceUpdates, initSuccessHandler: VoidFunction, errorHandler?: (e: Error) => void) => IDataSynchronizer)): FbClientBuilder;
}
//# sourceMappingURL=FbClientBuilder.d.ts.map