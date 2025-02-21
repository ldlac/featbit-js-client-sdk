"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Emits_1 = require("../../utils/Emits");
const EventEmitter_1 = require("../../utils/EventEmitter");
const utils_1 = require("../../data-sync/utils");
const types_1 = require("../../data-sync/types");
const socketConnectionIntervals = [1000, 3000, 5000, 7000, 11000, 13000, 30000, 60000];
class BrowserWebSocket {
    constructor() {
        this.retryCounter = 0;
        this.closed = false;
        this._config = {};
        this.emitter = new EventEmitter_1.EventEmitter();
    }
    identify(user) {
        this._config.user = user;
        this.doDataSync();
    }
    connect() {
        var _a, _b, _c, _d;
        let that = this;
        const startTime = Date.now();
        const url = this._config.streamingUri.replace(/^http/, 'ws') + `?type=client&token=${(0, utils_1.generateConnectionToken)(this._config.sdkKey)}`;
        this.ws = new WebSocket(url);
        // Connection opened
        (_a = that.ws) === null || _a === void 0 ? void 0 : _a.addEventListener('open', function (event) {
            // this is the websocket instance to which the current listener is binded to, it's different from that.socket
            that._config.logger.info(`WebSocket connection succeeded, connection time: ${Date.now() - startTime} ms`);
            that.doDataSync();
            that.sendPingMessage();
        });
        // Connection closed
        (_b = that.ws) === null || _b === void 0 ? void 0 : _b.addEventListener('close', function (event) {
            that._config.logger.warn('WebSocket closed');
            if (event.code === 4003) { // do not reconnect when 4003
                return;
            }
            that.reconnect();
        });
        // Connection error
        (_c = that.ws) === null || _c === void 0 ? void 0 : _c.addEventListener('error', function (event) {
            // reconnect
            that._config.logger.debug('error');
        });
        // Listen for messages
        (_d = that.ws) === null || _d === void 0 ? void 0 : _d.addEventListener('message', function (event) {
            const message = JSON.parse(event.data);
            if (message.messageType === 'data-sync') {
                switch (message.data.eventType) {
                    case types_1.StreamResponseEventType.patch:
                        that.emitter.emit('patch', message);
                        break;
                    case types_1.StreamResponseEventType.full:
                        that.emitter.emit('put', message);
                        break;
                }
            }
        });
    }
    close() {
        var _a;
        this.closed = true;
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.close(4003, 'The client is closed by user');
        this.ws = undefined;
    }
    config(param) {
        if (param.emitter) {
            this.emitter = param.emitter;
        }
        this._config = Object.assign({}, param);
    }
    sendPingMessage() {
        const payload = {
            messageType: 'ping',
            data: null
        };
        setTimeout(() => {
            var _a;
            try {
                if (((_a = this.ws) === null || _a === void 0 ? void 0 : _a.readyState) === WebSocket.OPEN) {
                    this._config.logger.debug('sending ping');
                    this.ws.send(JSON.stringify(payload));
                    this.sendPingMessage();
                }
                else {
                    this._config.logger.debug(`socket closed at ${new Date()}`);
                }
            }
            catch (err) {
                this._config.logger.debug(err);
            }
        }, this._config.pingInterval);
    }
    doDataSync() {
        var _a, _b;
        const payload = {
            messageType: 'data-sync',
            data: {
                timestamp: this._config.getStoreTimestamp(),
                user: this._config.user
            }
        };
        try {
            if (((_a = this.ws) === null || _a === void 0 ? void 0 : _a.readyState) === WebSocket.OPEN) {
                this._config.logger.debug('requesting data');
                (_b = this.ws) === null || _b === void 0 ? void 0 : _b.send(JSON.stringify(payload));
            }
            else {
                this._config.logger.error(`not requesting data because socket not open`);
            }
        }
        catch (err) {
            this._config.logger.debug(err);
        }
    }
    reconnect() {
        if (!this.closed) {
            this.ws = undefined;
            const waitTime = socketConnectionIntervals[Math.min(this.retryCounter++, socketConnectionIntervals.length - 1)];
            this._config.logger.info(`The client will try to reconnect in ${waitTime} milliseconds.`);
            setTimeout(() => {
                this._config.logger.info(`The client is trying to reconnect, flag evaluation results may be stale until reconnected, waited for: ${waitTime} milliseconds`);
                this.connect();
            }, waitTime);
        }
    }
}
exports.default = (0, Emits_1.Emits)(BrowserWebSocket);
//# sourceMappingURL=BrowserWebSocket.js.map