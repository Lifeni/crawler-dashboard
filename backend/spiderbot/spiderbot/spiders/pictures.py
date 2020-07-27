import scrapy
from spiderbot.items import PicturesItem


class PicturesSpider(scrapy.Spider):
    name = 'pictures'
    allowed_domains = ['test.lifeni.life']
    start_urls = ['https://test.lifeni.life/pictures/']
    custom_settings = {
        'ITEM_PIPELINES': {'spiderbot.pipelines.PicturesPipeline': 300}
    }

    url_set = set()

    def parse(self, response):
        print(response)
        if response.url.find('https://test.lifeni.life/') == 0:
            pictures = response.xpath('//div[@class="col p-0"]')
            for picture in pictures:
                item = PicturesItem()
                item['picture_url'] = picture.xpath('.//img/@src').extract()[0]
                item['picture_date'] = picture.xpath('.//small[@class="date text-light"]/text()').extract()[0]
                item['picture_description'] = picture.xpath('.//p[@class="card-text text-white"]/text()').extract()[0]
                item['picture_like'] = picture.xpath('.//small[@class="like mr-2"]/text()').extract()[0]
                item['picture_download'] = picture.xpath('.//small[@class="download"]/text()').extract()[0]
                yield item

        urls = response.xpath('//a[@class="page-link px-4 py-3"]')

        for url in urls:
            addr = url.xpath('./@href').extract()[0]
            addr = "https://test.lifeni.life/pictures/" + addr
            if addr.find("https://test.lifeni.life/") == 0:
                if addr in self.url_set or addr == 'https://test.lifeni.life/pictures/?page=1':
                    pass
                else:
                    self.url_set.add(addr)
                    yield self.make_requests_from_url(addr)
