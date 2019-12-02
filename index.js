const { ApolloLink } = require('apollo-link')

const { Prisma } = require('./dist')

let db = new Prisma({
  typeDefs: './generated/prisma.graphql',
  endpoint: 'http://localhost:3003', // the endpoint of the Prisma DB service
  secret: '12123', // specified in database/prisma.yml
  debug: false, // log all GraphQL queryies & mutations
  contextLink: new ApolloLink((operation, forward) => {
    console.log('index.js', operation.getContext())

    return forward(operation)
  }),
})
db.query.cServiceProvider({ where: { coreId: 1231231231 } }, info, {
  Auth: '123',
})

db = new Prisma({
  typeDefs: './generated/prisma.graphql',
  endpoint: 'http://localhost:3003', // the endpoint of the Prisma DB service
  secret: '12123', // specified in database/prisma.yml
  debug: false, // log all GraphQL queryies & mutations
  contextLink: new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Auth: '!!!!!!!!!prisma2',
      },
    })

    return forward(operation)
  }),
})

setTimeout(() => {
  db.query.cAircraftTypes({}, {}, { Auth: '123456' })
}, 4000)
