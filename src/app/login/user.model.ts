
export class User {
    constructor(
        public email: string,
        public localId: string,
        private idToken: string,
        private expiresIn: Date
    ) {}

    get token() {
        const expired = (new Date() > this.expiresIn);
        if (expired || !this.expiresIn) { return null; } else { return this.idToken; }
    }

}
