import scrapy
from spiderbot.items import PoemsAuthorsItem
from spiderbot.items import PoemsItem
import urllib


class PoemsSpider(scrapy.Spider):
    name = 'poems'
    allowed_domains = ['test.lifeni.life']
    start_urls = ['https://test.lifeni.life/poems/']
    custom_settings = {
        'ITEM_PIPELINES': {'spiderbot.pipelines.PoemsPipeline': 300}
    }

    def parse(self, response):
        print('<' + str(response.status) + ' ' + urllib.parse.unquote(str(response.url)) + '>')
        url_list = response.xpath('//li/a')
        for url in url_list:
            full_url = 'https://test.lifeni.life' + url.xpath('./@href').get()
            yield scrapy.Request(url=full_url, callback=self.parse_author)

    def parse_author(self, response):
        print('<' + str(response.status) + ' ' + urllib.parse.unquote(str(response.url)) + '>')
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
        paras = response.xpath('//article/p')
        content = ''
        for para in paras:
            content += para.xpath('./text()').get().strip()
        item = PoemsItem()
        item['poem_title'] = response.xpath('//h1/text()').get()
        item['poem_author'] = response.xpath('//h2/text()').get()
        item['poem_content'] = content
        item['poem_title_id'] = urllib.parse.unquote(str(response.url)).split('@')[1]
        yield item
