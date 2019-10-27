import graphene

from .account.schema import accountschema
from .auth.schema import authschema
from .accountinfo.schema import accountinfoschema


class Query(accountinfoschema.Query, authschema.Query, accountschema.Query, graphene.ObjectType):
    pass


# class Mutation(graphene.ObjectType):
#     pass


schema = graphene.Schema(query=Query)
