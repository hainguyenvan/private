import graphene

from .account.schema import accountschema
from .auth.schema import authschema


class Query(authschema.Query, accountschema.Query, graphene.ObjectType):
    pass


# class Mutation(graphene.ObjectType):
#     pass


schema = graphene.Schema(query=Query)
