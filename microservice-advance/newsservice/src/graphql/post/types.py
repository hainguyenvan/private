from graphene_django import DjangoObjectType
import graphene

from ..common.types import PaginationType
from ...apps.post.models import PostModel


class PostType(DjangoObjectType):
    class Meta:
        model = PostModel


class PostListType(graphene.ObjectType):
    status = graphene.Int()
    msg = graphene.String()
    pagination = graphene.Field(PaginationType)
    posts = graphene.List(PostType)


class PostObjectType(graphene.ObjectType):
    status = graphene.Int()
    msg = graphene.String()
    post = graphene.Field(PostType)
