import { IDataSynchronizer } from "../../data-sync/IDataSynchronizer";
import { IFlag } from "../../evaluation/data/IFlag";
import { EventName, ProcessStreamResponse } from "../../data-sync/types";
import { IDataSourceUpdates } from "../../store/IDataSourceUpdates";
import { VoidFunction } from "../../utils/VoidFunction";
import { IDataKind } from "../../IDataKind";
import { IKeyedStoreItem } from "../../store/store";
export default class TestDataSynchronizer implements IDataSynchronizer {
    private dataSourceUpdates;
    private readonly onStop;
    private readonly listeners;
    private readonly flags;
    private readonly userKeyId;
    constructor(dataSourceUpdates: IDataSourceUpdates, initialFlags: IFlag[], onStop: VoidFunction, listeners: Map<EventName, ProcessStreamResponse>);
    start(): Promise<void>;
    identify(): void;
    stop(): void;
    close(): void;
    upsert(kind: IDataKind, value: IKeyedStoreItem): Promise<void>;
}
//# sourceMappingURL=TestDataSynchronizer.d.ts.map