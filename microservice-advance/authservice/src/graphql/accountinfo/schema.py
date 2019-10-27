import graphene

from .query import Query
# from .mutation import Mutation

accountinfoschema = graphene.Schema(query=Query)