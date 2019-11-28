import { ApolloLink, Operation, NextLink, Observable, FetchResult } from 'apollo-link';
export declare class SharedLink extends ApolloLink {
    private innerLink?;
    private context?;
    setInnerLink(innerLink: ApolloLink, context: Record<string, any>): void;
    request(operation: Operation, forward?: NextLink): Observable<FetchResult> | null;
}
