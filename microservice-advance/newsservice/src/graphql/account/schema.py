import graphene

from .query import Query
# from .mutation import Mutation

accountschema = graphene.Schema(query=Query)
