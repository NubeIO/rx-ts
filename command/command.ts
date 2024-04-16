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


	// req 
	// resp r/resp/v1/cloud/RX-2/plain/query/RX-1/req-uuid

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

export enum RequestType {
    REQ = "req", // request
    RESP = "res" // response 
}

export class RequestTopicBuilder {
    private readonly parts: string[];

    private requestType: RequestType = RequestType.REQ; // req (request) is the default value or resp for response 


    constructor() {
        this.parts = [];
    }

    withVersion(version: string): RequestTopicBuilder {
        this.parts.push(version);
        return this;
    }

    withClientType(clientType: ClientType): RequestTopicBuilder {
        this.parts.push(clientType);
        return this;
    }

    withTargetUUID(targetUUID: string): RequestTopicBuilder {
        this.parts.push(targetUUID);
        return this;
    }

    withSenderUUID(senderUUID: string): RequestTopicBuilder {
        this.parts.push(senderUUID);
        return this;
    }

    withRequestUUID(requestUUID: string): RequestTopicBuilder {
        this.parts.push(requestUUID);
        return this;
    }

    withDataType(dataType: DataType = DataType.Plain): RequestTopicBuilder {
        this.parts.push(dataType);
        return this;
    }

    withType(type: Type): RequestTopicBuilder {
        this.parts.push(type);
        return this;
    }

    withRequestType(requestType: RequestType): RequestTopicBuilder {
        this.requestType = requestType;
        return this;
    }


    build(): string {
        return `r/${this.requestType}/${this.parts.join("/")}`;
    }
}


