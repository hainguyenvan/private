import graphene
from graphene_django import DjangoObjectType
from django.core.paginator import Paginator

from ...apps.post.models import PostModel
from .types import (PostObjectType, PostListType)
from ...conf.http_res import HTTP_RES
from ...conf.constant import Constant


class Query(graphene.ObjectType):

    get_all_posts = graphene.Field(PostListType)

    def resolve_get_all_posts(self, info):
        try:
            posts = PostModel.objects.all()
            res = {
                'status': HTTP_RES.CODE_SUCCESSFULY,
                'msg': HTTP_RES.MSG_SUCCESSFULY,
                'posts': posts
            }
            return res
        except Exception as err:
            res = {
                'status': HTTP_RES.CODE_BAD_REQUEST,
                'msg': err
            }
            return res
