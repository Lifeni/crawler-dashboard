from urllib.parse import unquote

from django.db.models import Count, Sum, Avg, Max, Min
from django.http import JsonResponse

from .models import Pictures
from .models import Poems
from .models import PoemsAuthors
from .models import Sentences


# Create your views here.


def index(request):
    pictures_json = {
        'data_count': Pictures.objects.count(),
        # aggregate 聚合
        'total_like_count': Pictures.objects.aggregate(Sum('picture_like'))['picture_like__sum'],
        'avg_like_count': Pictures.objects.aggregate(Avg('picture_like'))['picture_like__avg'],
        'max_like_count': Pictures.objects.aggregate(Max('picture_like'))['picture_like__max'],
        # order_by 排序，加负号代表降序
        'max_like_count_image_url': Pictures.objects.order_by('-picture_like')[0].picture_url,
        'max_like_count_image_date': Pictures.objects.order_by('-picture_like')[0].picture_date,
        'max_like_count_image_text': Pictures.objects.order_by('-picture_like')[0].picture_description,
        'min_like_count': Pictures.objects.aggregate(Min('picture_like'))['picture_like__min'],
        'total_download_count': Pictures.objects.aggregate(Sum('picture_download'))['picture_download__sum'],
        'avg_download_count': Pictures.objects.aggregate(Avg('picture_download'))['picture_download__avg'],
        'max_download_count': Pictures.objects.aggregate(Max('picture_download'))['picture_download__max'],
        'max_download_count_image_url': Pictures.objects.order_by('-picture_download')[0].picture_url,
        'max_download_count_image_date': Pictures.objects.order_by('-picture_download')[0].picture_date,
        'max_download_count_image_text': Pictures.objects.order_by('-picture_download')[0].picture_description,
        'min_download_count': Pictures.objects.aggregate(Min('picture_download'))['picture_download__min'],
        # 获取所有的图片数据
        'num_data': list(Pictures.objects.all().values('id', 'picture_date', 'picture_like', 'picture_download')),
    }

    # 获取每个作者的词数量列表
    author_poem_list = Poems.objects.values('poem_author').annotate(Count('poem_author')).all().order_by('-poem_author__count')

    # 获取每个词牌名的词数量列表
    poem_title_list = Poems.objects.values('poem_title').annotate(Count('poem_title')).all().order_by('-poem_title__count')

    poems_json = {
        'data_count': Poems.objects.count(),
        'author_data_count': PoemsAuthors.objects.count(),
        'author_count': Poems.objects.values('poem_author').distinct().count(),
        'title_count': Poems.objects.values('poem_title').distinct().count(),
        'author_poem_data': list(author_poem_list),
        'author_avg_poem_count': Poems.objects.count() / PoemsAuthors.objects.count(),
        'poem_title_data': list(poem_title_list),
        'poem_avg_title_count': Poems.objects.count() / Poems.objects.values('poem_title').distinct().count(),
        # 只有一个作品的作者人数
        'poem_count_1': author_poem_list.filter(poem_author__count=1).count(),
    }

    sentences_json = {
        'data_count': Sentences.objects.count(),
        # 句子的分类数据
        'sentence_data': list(
            Sentences.objects.values('sentence_category', 'sentence_category_description').annotate(Count('sentence_category')).all().order_by('-sentence_category__count'))
    }

    # 概览数据
    overview_json = {
        'total_data_count': pictures_json['data_count'] + poems_json['data_count'] + poems_json['author_data_count'] + sentences_json['data_count'],
        'category_count': 3,
        'database_table_count': 4,
        'pictures_data_count': pictures_json['data_count'],
        'pictures_image_count': pictures_json['data_count'],
        'pictures_total_like_count': pictures_json['total_like_count'],
        'pictures_total_download_count': pictures_json['total_download_count'],
        'poems_data_count': poems_json['data_count'] + poems_json['author_data_count'],
        'poems_poem_count': poems_json['data_count'],
        'poems_author_count': poems_json['author_data_count'],
        'sentences_data_count': sentences_json['data_count'],
        'sentences_try_count': 6400,
        'sentences_category_count': 8,
    }

    # 返回 JSON 数据，下同
    return JsonResponse({
        'code': '0',
        'message': 'ok',
        'overview': overview_json,
        'pictures': pictures_json,
        'poems': poems_json,
        'sentences': sentences_json,
    })


# 获取随机一个句子
def sentences(request):
    sentence = Sentences.objects.all().order_by('?').first()
    return JsonResponse({
        'code': '0',
        'message': 'ok',
        'id': sentence.sentence_id,
        'category': sentence.sentence_category,
        'text': sentence.sentence_content,
        'from': sentence.sentence_from,
        'from_who': sentence.sentence_from_who,
    })


# 获取指定作者信息
def poems(request, name):
    author_name = unquote(name)
    return JsonResponse({
        'code': '0',
        'message': 'ok',
        'description': PoemsAuthors.objects.filter(author_name=author_name).first().author_description
    })


# 获取指定图片信息
def pictures(request, id):
    image = Pictures.objects.filter(id=id).first()
    return JsonResponse({
        'code': '0',
        'message': 'ok',
        'url': image.picture_url,
        'text': image.picture_description,
    })
