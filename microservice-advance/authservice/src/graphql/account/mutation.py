# import jwt
# import graphene
# from graphene_django import DjangoObjectType

# from ...conf.http_res import HTTP_RES
# from ...apps.category.models import CategoryModel
# from ...apps.category.serializers.category import CategorySerializer
# from .types import CategoryType


# class CreateCategory(graphene.Mutation):
#     class Arguments:
#         name = graphene.String(required=True)
#         description = graphene.String()
#         images = graphene.String()
#         shop_id = graphene.String(required=True)

#     status = graphene.Int()
#     category = graphene.Field(CategoryType)

#     @staticmethod
#     def mutate(root, info, **kwargs):
#         try:
#             api_key = info.context.META['HTTP_XAPIKEY']
#             payload = jwt.decode(api_key, verify=False)
#             kwargs['created_by'] = payload['user_id']
#             kwargs['modified_by'] = payload['user_id']

#             serializer = CategorySerializer(data=kwargs)
#             if serializer.is_valid():
#                 category = serializer.save()
#                 return CreateCategory(status=HTTP_RES.CODE_SUCCESSFULY, category=category)
#             return CreateCategory(status=HTTP_RES.CODE_BAD_REQUEST, category=None)
#         except Exception as err:
#             return CreateCategory(status=HTTP_RES.CODE_BAD_REQUEST, category=None)


# class UpdateCategory(graphene.Mutation):
#     class Arguments:
#         id = graphene.String(required=True)
#         name = graphene.String(required=True)
#         description = graphene.String()
#         images = graphene.String()
#         shop_id = graphene.String(required=True)

#     status = graphene.Int()
#     category = graphene.Field(CategoryType)

#     @staticmethod
#     def mutate(root, info, **kwargs):
#         try:
#             api_key = info.context.META['HTTP_XAPIKEY']
#             payload = jwt.decode(api_key, verify=False)
#             kwargs['modified_by'] = payload['user_id']

#             category_saved = CategoryModel.objects.get(id=kwargs['id'])
#             serializer = CategorySerializer(
#                 instance=category_saved, data=kwargs,  partial=True)
#             if serializer.is_valid(raise_exception=True):
#                 update = serializer.save()
#                 return UpdateCategory(status=HTTP_RES.CODE_SUCCESSFULY, category=update)
#             return UpdateCategory(status=HTTP_RES.CODE_BAD_REQUEST, category=None)
#         except Exception as err:
#             print(err)
#             return UpdateCategory(status=HTTP_RES.CODE_BAD_REQUEST, category=None)


# class DeleteCategory(graphene.Mutation):
#     status = graphene.Int()

#     class Arguments:
#         id = graphene.String(required=True)

#     @staticmethod
#     def mutate(root, info, id):
#         try:
#             category = CategoryModel.objects.get(id=id)
#             category.delete()
#             return DeleteCategory(status=HTTP_RES.CODE_SUCCESSFULY)
#         except Exception as err:
#             return DeleteCategory(status=HTTP_RES.CODE_BAD_REQUEST)


# class Mutation(graphene.ObjectType):
#     create_category = CreateCategory.Field()
#     delete_category = DeleteCategory.Field()
#     update_category = UpdateCategory.Field()
