export class Component {
    protected content: string;
    protected className: string;

    constructor(content: string = '', className: string = '') {
        this.content = content;
        this.className = className;
    }

    getHTML(): string {
       return this.content;
    }

    getContent(): string {
        return this.content;
    }
}