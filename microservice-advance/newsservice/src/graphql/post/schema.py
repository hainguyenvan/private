import graphene

from .query import Query
# from .mutation import Mutation

postschema = graphene.Schema(query=Query)
