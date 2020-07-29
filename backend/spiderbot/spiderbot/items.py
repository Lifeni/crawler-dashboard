# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class SpiderbotItem(scrapy.Item):
    # 没有用
    pass


# 必应壁纸 相关字段
class PicturesItem(scrapy.Item):
    picture_url = scrapy.Field()
    picture_date = scrapy.Field()
    picture_description = scrapy.Field()
    picture_like = scrapy.Field()
    picture_download = scrapy.Field()


# 宋词 词 相关字段
class PoemsItem(scrapy.Item):
    poem_author = scrapy.Field()
    poem_title = scrapy.Field()
    poem_title_id = scrapy.Field()
    poem_content = scrapy.Field()


# 宋词 作者 相关字段
class PoemsAuthorsItem(scrapy.Item):
    author_name = scrapy.Field()
    author_description = scrapy.Field()


# 一言 相关字段
class SentencesItem(scrapy.Item):
    sentence_id = scrapy.Field()
    sentence_category = scrapy.Field()
    sentence_category_description = scrapy.Field()
    sentence_content = scrapy.Field()
    sentence_from = scrapy.Field()
    sentence_from_who = scrapy.Field()
