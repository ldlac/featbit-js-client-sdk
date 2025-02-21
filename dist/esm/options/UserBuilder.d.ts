import { IUser } from "./IUser";
/**
 * Creates an instance of the FeatBit user.
 *
 * @return
 *   The new {@link IUser} instance.
 */
export declare class UserBuilder {
    private _keyId;
    private _name;
    private _custom;
    constructor(keyId: string);
    name(name: string): UserBuilder;
    custom(propertyName: string, value: string): UserBuilder;
    build(): IUser;
}
//# sourceMappingURL=UserBuilder.d.ts.map