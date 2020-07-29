# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Pictures(models.Model):
    picture_url = models.CharField(max_length=255)
    picture_date = models.CharField(max_length=255)
    picture_description = models.CharField(max_length=255)
    picture_like = models.IntegerField()
    picture_download = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'pictures'


class Poems(models.Model):
    poem_author = models.ForeignKey('PoemsAuthors', models.DO_NOTHING, db_column='poem_author')
    poem_title = models.CharField(max_length=255)
    poem_title_id = models.CharField(max_length=255)
    poem_content = models.TextField()

    class Meta:
        managed = False
        db_table = 'poems'


class PoemsAuthors(models.Model):
    author_name = models.CharField(unique=True, max_length=255)
    author_description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'poems_authors'


class Sentences(models.Model):
    sentence_id = models.PositiveIntegerField(primary_key=True)
    sentence_category = models.CharField(max_length=255)
    sentence_category_description = models.CharField(max_length=255)
    sentence_content = models.CharField(max_length=255)
    sentence_from = models.CharField(max_length=255, blank=True, null=True)
    sentence_from_who = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sentences'
