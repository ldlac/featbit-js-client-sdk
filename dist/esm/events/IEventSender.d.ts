export declare enum DeliveryStatus {
    Succeeded = 0,
    Failed = 1,
    FailedAndMustShutDown = 2
}
export interface IEventSenderResult {
    status: DeliveryStatus;
    error?: any;
}
export interface IEventSender {
    send(payload: string, retry: boolean): Promise<IEventSenderResult>;
}
//# sourceMappingURL=IEventSender.d.ts.map