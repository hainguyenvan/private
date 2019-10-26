import graphene

from .query import Query
# from .mutation import Mutation

authschema = graphene.Schema(query=Query)
