# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
import MySQLdb
from spiderbot.items import PoemsItem


class SpiderbotPipeline:
    def process_item(self, item, spider):
        # 没用上
        return item


# 必应壁纸 数据处理
class PicturesPipeline:
    # 启动爬虫的时候连接数据库
    def open_spider(self, spider):
        # 第二个参数是默认值，下同
        db = spider.settings.get('MYSQL_DB_NAME', 'dashboard')
        host = spider.settings.get('MYSQL_HOST', 'localhost')
        port = spider.settings.get('MYSQL_PORT', 3306)
        user = spider.settings.get('MYSQL_USER', 'root')
        password = spider.settings.get('MYSQL_PASSWORD', 'mysql')

        self.connect = MySQLdb.connect(host=host, port=port, user=user, passwd=password, db=db, charset='utf8mb4')
        self.cursor = self.connect.cursor()

    # 关闭爬虫的时候关闭数据库
    def close_spider(self, spider):
        self.cursor.close()
        self.connect.commit()
        self.connect.close()

    def process_item(self, item, spider):
        # 普通的插入数据
        self.cursor.execute('insert into pictures(picture_url,picture_date,picture_description,picture_like,picture_download) values(%s, %s, %s, %s, %s)', (
            item['picture_url'].strip(),
            item['picture_date'].strip(),
            item['picture_description'].strip(),
            int(item['picture_like'].strip()),
            int(item['picture_download'].strip())))

        return item


# 宋词 数据处理
class PoemsPipeline:
    # 启动爬虫的时候连接数据库
    def open_spider(self, spider):
        db = spider.settings.get('MYSQL_DB_NAME', 'dashboard')
        host = spider.settings.get('MYSQL_HOST', 'localhost')
        port = spider.settings.get('MYSQL_PORT', 3306)
        user = spider.settings.get('MYSQL_USER', 'root')
        password = spider.settings.get('MYSQL_PASSWORD', 'mysql')

        self.connect = MySQLdb.connect(host=host, port=port, user=user, passwd=password, db=db, charset='utf8mb4')
        self.cursor = self.connect.cursor()

    # 关闭爬虫的时候关闭数据库
    def close_spider(self, spider):
        self.cursor.close()
        self.connect.commit()
        self.connect.close()

    def process_item(self, item, spider):
        # 根据传入的 item 的类型判断要插入数据库的哪个表
        if isinstance(item, PoemsItem):
            self.cursor.execute('insert into poems(poem_author,poem_title,poem_title_id,poem_content) values(%s, %s, %s, %s)',
                                (item['poem_author'].strip(), item['poem_title'].strip(),
                                 item['poem_title_id'].strip(), item['poem_content'].strip()))
        else:
            # 如果内容不为空，就去除前后空格再插入
            author_description = item['author_description']
            if item['author_description'] is not None:
                author_description = item['author_description'].strip()
            self.cursor.execute('insert into poems_authors(author_name,author_description) values(%s, %s)', (
                item['author_name'].strip(),
                author_description))

        return item


# 一言 数据处理
class SentencesPipeline:
    # 启动爬虫的时候连接数据库
    def open_spider(self, spider):
        db = spider.settings.get('MYSQL_DB_NAME', 'dashboard')
        host = spider.settings.get('MYSQL_HOST', 'localhost')
        port = spider.settings.get('MYSQL_PORT', 3306)
        user = spider.settings.get('MYSQL_USER', 'root')
        password = spider.settings.get('MYSQL_PASSWORD', 'mysql')

        self.connect = MySQLdb.connect(host=host, port=port, user=user, passwd=password, db=db, charset='utf8mb4')
        self.cursor = self.connect.cursor()

        # 用于批量插入的列表
        self.cache = []

    # 关闭爬虫的时候关闭数据库
    def close_spider(self, spider):
        # 批量插入数据
        self.cursor.executemany(
            'insert into sentences(sentence_id,sentence_category,sentence_category_description,sentence_content,sentence_from,sentence_from_who) values(%s, %s, %s, %s, %s, %s)',
            self.cache)

        self.cursor.close()
        self.connect.commit()
        self.connect.close()

    def process_item(self, item, spider):
        # 如果存在数据就把字符串前后的空白去除，下同
        sen_from = item['sentence_from']
        if item['sentence_from'] is not None:
            sen_from = item['sentence_from'].strip()

        sen_from_who = item['sentence_from_who']
        if item['sentence_from_who'] is not None:
            sen_from_who = item['sentence_from_who'].strip()

        # 批量插入数据要求列表内是元组
        self.cache.append((int(item['sentence_id'].strip()),
                           item['sentence_category'].strip(),
                           item['sentence_category_description'].strip(),
                           item['sentence_content'].strip(),
                           sen_from,
                           sen_from_who
                           ))
        return item
