interface Command {
    senderGlobalID: string;
    key: string;
    args: string[];
    data: Record<string, string>;
    pagination?: string;
    pageNumber?: number;
    pageSize?: number;
    childs?: string;
}

export class CommandBuilder {
    private readonly request: Command;

    GetObjects(query?: string): CommandBuilder {
        const data: Record<string, string> = {
            as: "json"
        };
        if (query) {
            data.query = query;
        }
        return this.withArgs(["get", "objects"]).withData(data);
    }


    GetObjectsPagination(pageNumber: number, pageSize: number): CommandBuilder {
        return this.withArgs(["get", "objects"]).withData({
            childs: "true",
            pagination: "true",
            pageNumber: pageNumber.toString(),
            pageSize: pageSize.toString(),
            as: "json"
        } as Record<string, string>);
    }



    constructor(senderGlobalID: string) {
        const key = "remoteRequest";
        this.request = {
            senderGlobalID,
            key,
            args: [],
            data: {}
        };

    }

    withArgs(args: string[]): CommandBuilder {
        this.request.args = args;
        return this;
    }

    withData(data: Record<string, string>): CommandBuilder {
        this.request.data = data;
        return this;
    }

    build(): Command {
        return this.request;
    }
}



export enum DataType {
    Plain = "plain",
    Proto = "proto"
}

export enum ClientType {
    Edge = "edge",
    Cloud = "cloud",
    UI = "ui"
}

export enum Type {
    Object = "object",
    Objects = "object",
    Runtime = "runtime",
}


export class PublishTopicBuilder {
    private readonly parts: string[];

    constructor() {
        this.parts = [];
    }

    withVersion(version: string): PublishTopicBuilder {
        this.parts.push(version);
        return this;
    }

    withClientType(clientType: ClientType): PublishTopicBuilder {
        this.parts.push(clientType);
        return this;
    }


    withTargetUUID(targetUUID: string): PublishTopicBuilder {
        this.parts.push(targetUUID);
        return this;
    }

    withSenderUUID(senderUUID: string): PublishTopicBuilder {
        this.parts.push(senderUUID);
        return this;
    }

    withRequestUUID(requestUUID: string): PublishTopicBuilder {
        this.parts.push(requestUUID);
        return this;
    }

    withDataType(dataType: DataType = DataType.Plain): PublishTopicBuilder {
        this.parts.push(dataType);
        return this;
    }

    withType(type: Type): PublishTopicBuilder {
        this.parts.push(type);
        return this;
    }

    build(): string {
        return `r/req/${this.parts.join("/")}`;
    }
}




export class SubscribeTopicBuilder {
    private readonly parts: string[];

    constructor() {
        this.parts = [];
    }

    withVersion(version: string): SubscribeTopicBuilder {
        this.parts.push(version);
        return this;
    }

    withClientType(clientType: ClientType): SubscribeTopicBuilder {
        this.parts.push(clientType);
        return this;
    }


    withTargetUUID(targetUUID: string): SubscribeTopicBuilder {
        this.parts.push(targetUUID);
        return this;
    }

    withSenderUUID(senderUUID: string): SubscribeTopicBuilder {
        this.parts.push(senderUUID);
        return this;
    }

    withRequestUUID(requestUUID: string): SubscribeTopicBuilder {
        this.parts.push(requestUUID);
        return this;
    }

    withDataType(dataType: DataType = DataType.Plain): SubscribeTopicBuilder {
        this.parts.push(dataType);
        return this;
    }

    withType(type: Type): SubscribeTopicBuilder {
        this.parts.push(type);
        return this;
    }

    build(): string {
        return `r/resp/${this.parts.join("/")}`;
    }
}