import graphene
from graphene_django import DjangoObjectType
from django.core.paginator import Paginator

from ...apps.category.models import CategoryModel
from .types import (CategoryObjectType, CategoryListType)
from ...conf.http_res import HTTP_RES
from ...conf.constant import Constant


class Query(graphene.ObjectType):

    get_all_caregories = graphene.Field(CategoryListType)

    def resolve_get_all_caregories(self, info):
        try:
            categories = CategoryModel.objects.all()
            res = {
                'status': HTTP_RES.CODE_SUCCESSFULY,
                'msg': HTTP_RES.MSG_SUCCESSFULY,
                'categories': categories
            }
            return res
        except Exception as err:
            res = {
                'status': HTTP_RES.CODE_BAD_REQUEST,
                'msg': err
            }
            return res
