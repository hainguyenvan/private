import graphene

from .query import Query
# from .mutation import Mutation

categoryschema = graphene.Schema(query=Query)