import graphene

from .account.schema import accountschema
from .category.schema import categoryschema
from .post.schema import postschema


class Query(postschema.Query, categoryschema.Query, accountschema.Query, graphene.ObjectType):
    pass


# class Mutation(graphene.ObjectType):
#     pass


schema = graphene.Schema(query=Query)
