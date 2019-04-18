export class IUC2Instance {
    name: string;
    id: string;
    type: string;
    az: string;
    publicIP: string;
    privateIP: string;
    state: string;
}

export class IPagedItem {
    total: number 
    errorMessage: string;
    instances: IUC2Instance[]
}