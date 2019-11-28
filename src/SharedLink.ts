import {
  ApolloLink,
  Operation,
  NextLink,
  Observable,
  FetchResult,
} from 'apollo-link'

export class SharedLink extends ApolloLink {
  private innerLink?: ApolloLink
  private context?: Record<string, any>

  setInnerLink(innerLink: ApolloLink, context: Record<string, any>) {
    this.innerLink = innerLink
    this.context = context
  }

  request(
    operation: Operation,
    forward?: NextLink,
  ): Observable<FetchResult> | null {
    if (!this.innerLink) {
      throw new Error('No inner link set')
    }

    if (this.context) {
      operation.setContext(({ headers }) => ({
        headers: {
          ...headers,
          ...this.context,
        },
      }))
    }

    return this.innerLink.request(operation, forward)
  }
}
