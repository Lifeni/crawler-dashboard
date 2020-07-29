import scrapy
from spiderbot.items import PoemsAuthorsItem
from spiderbot.items import PoemsItem
import urllib


class PoemsSpider(scrapy.Spider):
    name = 'poems'
    allowed_domains = ['test.lifeni.life']
    start_urls = ['https://test.lifeni.life/poems/']

    # 设定处理数据的 pipelines
    custom_settings = {
        'ITEM_PIPELINES': {'spiderbot.pipelines.PoemsPipeline': 300}
    }

    # 网页结构分成三层，需要依次进行爬取
    # 第一层是作者索引页面
    def parse(self, response):
        print('<' + str(response.status) + ' ' + urllib.parse.unquote(str(response.url)) + '>')
        url_list = response.xpath('//li/a')
        for url in url_list:
            full_url = 'https://test.lifeni.life' + url.xpath('./@href').get()

            # 再次发起请求，爬取子页面，下同
            yield scrapy.Request(url=full_url, callback=self.parse_author)

    # 第二层是作者的个人信息和作品索引页面
    def parse_author(self, response):
        print('<' + str(response.status) + ' ' + urllib.parse.unquote(str(response.url)) + '>')

        # 又是普通的 xpath
        item = PoemsAuthorsItem()
        item['author_name'] = response.xpath('//h1/text()').get()
        item['author_description'] = response.xpath('//p[@id="description"]/text()').get()
        yield item

        url_list = response.xpath('//ul/li/a')
        for url in url_list:
            full_url = 'https://test.lifeni.life' + url.xpath('./@href').get()
            yield scrapy.Request(url=full_url, callback=self.parse_poem)

    def parse_poem(self, response):
        print('<' + str(response.status) + ' ' + urllib.parse.unquote(str(response.url)) + '>')

        # 由于页面中词的内容是按句存的，所以要拼接在一起
        paras = response.xpath('//article/p')
        content = ''
        for para in paras:
            content += para.xpath('./text()').get().strip()

        item = PoemsItem()
        item['poem_title'] = response.xpath('//h1/text()').get()
        item['poem_author'] = response.xpath('//h2/text()').get()
        item['poem_content'] = content

        # URL Decode
        item['poem_title_id'] = urllib.parse.unquote(str(response.url)).split('@')[1]
        yield item
