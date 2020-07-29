import json

from django.db.models import Count, Sum, Avg, Max, Min
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from .models import Pictures
from .models import Poems
from .models import PoemsAuthors
from .models import Sentences


# Create your views here.


def index(request):
    pictures_json = {
        'data_count': Pictures.objects.count(),
        'total_like_count': Pictures.objects.aggregate(Sum('picture_like'))['picture_like__sum'],
        'avg_like_count': Pictures.objects.aggregate(Avg('picture_like'))['picture_like__avg'],
        'max_like_count': Pictures.objects.aggregate(Max('picture_like'))['picture_like__max'],
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
        'num_data': list(Pictures.objects.all().values('picture_date', 'picture_like', 'picture_download'))
    }

    author_poem_list = Poems.objects.values('poem_author').annotate(Count('poem_author')).all().order_by('-poem_author__count')
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
        'poem_count_1': author_poem_list.filter(poem_author__count=1).count(),
    }

    sentences_json = {
        'data_count': Sentences.objects.count(),
        'sentence_data': list(
            Sentences.objects.values('sentence_category', 'sentence_category_description').annotate(Count('sentence_category')).all().order_by('-sentence_category__count'))
    }

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
        'sentences_try_count': 6500,
        'sentences_category_count': 8,
    }

    response = JsonResponse({
        'code': '0',
        'message': 'ok',
        'overview': overview_json,
        'pictures': pictures_json,
        'poems': poems_json,
        'sentences': sentences_json,
    })

    response['Access-Control-Allow-Origin'] = '*'

    return response
