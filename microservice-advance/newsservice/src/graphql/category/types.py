from graphene_django import DjangoObjectType
import graphene

from ..common.types import PaginationType
from ...apps.category.models import CategoryModel


class CategoryType(DjangoObjectType):
    class Meta:
        model = CategoryModel


class CategoryListType(graphene.ObjectType):
    status = graphene.Int()
    msg = graphene.String()
    pagination = graphene.Field(PaginationType)
    categories = graphene.List(CategoryType)


class CategoryObjectType(graphene.ObjectType):
    status = graphene.Int()
    msg = graphene.String()
    category = graphene.Field(CategoryType)
