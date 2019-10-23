import graphene


class PaginationType(graphene.ObjectType):
    items_per_page = graphene.Int()
    total_page = graphene.Int()
    page_no = graphene.Int()
