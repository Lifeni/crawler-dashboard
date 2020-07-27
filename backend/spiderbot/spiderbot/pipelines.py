# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import MySQLdb
from spiderbot.items import PoemsAuthorsItem
from spiderbot.items import PoemsItem


class SpiderbotPipeline:
    def process_item(self, item, spider):
        return item


class PicturesPipeline:
    def open_spider(self, spider):
        db = spider.settings.get('MYSQL_DB_NAME', 'dashboard')
        host = spider.settings.get('MYSQL_HOST', 'localhost')
        port = spider.settings.get('MYSQL_PORT', 3306)
        user = spider.settings.get('MYSQL_USER', 'root')
        password = spider.settings.get('MYSQL_PASSWORD', 'mysql')

        self.connect = MySQLdb.connect(host=host, port=port, user=user, passwd=password, db=db, charset='utf8mb4')
        self.cursor = self.connect.cursor()

    def close_spider(self, spider):
        self.cursor.close()
        self.connect.commit()
        self.connect.close()

    def process_item(self, item, spider):
        self.cursor.execute('insert into pictures(picture_url,picture_date,picture_description,picture_like,picture_download) values(%s, %s, %s, %s, %s)', (
            item['picture_url'].strip(),
            item['picture_date'].strip(),
            item['picture_description'].strip(),
            int(item['picture_like'].strip()),
            int(item['picture_download'].strip())))

        return item


class PoemsPipeline:

    def open_spider(self, spider):
        db = spider.settings.get('MYSQL_DB_NAME', 'dashboard')
        host = spider.settings.get('MYSQL_HOST', 'localhost')
        port = spider.settings.get('MYSQL_PORT', 3306)
        user = spider.settings.get('MYSQL_USER', 'root')
        password = spider.settings.get('MYSQL_PASSWORD', 'mysql')

        self.connect = MySQLdb.connect(host=host, port=port, user=user, passwd=password, db=db, charset='utf8mb4')
        self.cursor = self.connect.cursor()

    def close_spider(self, spider):
        self.cursor.close()
        self.connect.commit()
        self.connect.close()

    def process_item(self, item, spider):
        if isinstance(item, PoemsItem):
            self.cursor.execute('insert into poems(poem_author,poem_title,poem_title_id,poem_content) values(%s, %s, %s, %s)', (
                item['poem_author'].strip(),
                item['poem_title'].strip(),
                item['poem_title_id'].strip(),
                item['poem_content'].strip()))
        else:
            author_description = item['author_description']
            if item['author_description'] is not None:
                author_description = item['author_description'].strip()
            self.cursor.execute('insert into poems_authors(author_name,author_description) values(%s, %s)', (
                item['author_name'].strip(),
                author_description))

        return item


class SentencesPipeline:

    def open_spider(self, spider):
        db = spider.settings.get('MYSQL_DB_NAME', 'dashboard')
        host = spider.settings.get('MYSQL_HOST', 'localhost')
        port = spider.settings.get('MYSQL_PORT', 3306)
        user = spider.settings.get('MYSQL_USER', 'root')
        password = spider.settings.get('MYSQL_PASSWORD', 'mysql')

        self.connect = MySQLdb.connect(host=host, port=port, user=user, passwd=password, db=db, charset='utf8mb4')
        self.cursor = self.connect.cursor()

        self.cache = []

    def close_spider(self, spider):
        self.cursor.executemany(
            'insert into sentences(sentence_id,sentence_category,sentence_category_description,sentence_content,sentence_from,sentence_from_who) values(%s, %s, %s, %s, %s, %s)',
            self.cache)

        self.cursor.close()
        self.connect.commit()
        self.connect.close()

    def process_item(self, item, spider):
        sen_from = item['sentence_from']
        if item['sentence_from'] is not None:
            sen_from = item['sentence_from'].strip()

        sen_from_who = item['sentence_from_who']
        if item['sentence_from_who'] is not None:
            sen_from_who = item['sentence_from_who'].strip()

        self.cache.append((int(item['sentence_id'].strip()),
                           item['sentence_category'].strip(),
                           item['sentence_category_description'].strip(),
                           item['sentence_content'].strip(),
                           sen_from,
                           sen_from_who
                           ))
        return item
