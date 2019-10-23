import graphene

from .account.schema import accountschema


class Query(accountschema.Query, graphene.ObjectType):
    pass


# class Mutation(graphene.ObjectType):
#     pass


schema = graphene.Schema(query=Query)
