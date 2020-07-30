import scrapy
from spiderbot.items import SentencesItem


class SentencesSpider(scrapy.Spider):
    name = 'sentences'
    allowed_domains = ['test.lifeni.life']

    # 允许 404 状态
    handle_httpstatus_list = [404]

    min_id = 1  # 爬虫起始 id
    max_id = 6400  # 爬虫终止 id
    now_id = min_id  # 爬虫当前 id

    start_urls = ['https://test.lifeni.life/sentences/?id=%d' % min_id]

    # 设定处理数据的 pipelines
    custom_settings = {
        'ITEM_PIPELINES': {'spiderbot.pipelines.SentencesPipeline': 300}
    }

    def parse(self, response):
        print(response)

        # 判断非 404 网页
        if response.xpath('//body/h3').get() is not None:
            item = SentencesItem()

            # 普通的 xpath
            item['sentence_id'] = response.xpath('//h3/span[@class="id mr-2"]/text()').extract()[0]
            item['sentence_category'] = response.xpath('//span[@class="type"]/text()').extract()[0]
            item['sentence_category_description'] = response.xpath('//span[@class="type"]/@data-desc').extract()[0]
            item['sentence_content'] = response.xpath('//h1[@class="fa-4x"]/text()').extract()[0]
            item['sentence_from'] = response.xpath('//span[@class="from mr-2"]/text()').get()
            item['sentence_from_who'] = response.xpath('//span[@class="from-who ml-2"]/text()').get()

            yield item

        # 如果 id 没有超出范围，则继续递增爬取下一个网页
        if self.now_id < self.max_id:
            self.now_id = self.now_id + 1
            yield self.make_requests_from_url('http://test.lifeni.life/sentences/?id=%d' % self.now_id)
