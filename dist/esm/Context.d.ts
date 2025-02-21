import { IUser } from "./options/IUser";
export default class Context {
    private _user?;
    /**
     * Is this a valid context. If a valid context cannot be created, then this flag will be true.
     * The validity of a context should be tested before it is used.
     */
    readonly valid: boolean;
    readonly message?: string;
    /**
     * Contexts should be created using the static factory method {@link Context.fromUser}.
     *
     * The factory methods are static functions within the class because they access private
     * implementation details, so they cannot be free functions.
     */
    private constructor();
    static fromUser(user: IUser): Context;
    get user(): IUser;
    get keyId(): string;
    value(property: string): any;
    private static contextForError;
}
//# sourceMappingURL=Context.d.ts.map