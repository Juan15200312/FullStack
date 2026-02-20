from django.db import models

class OrderItemModel(models.Model):
    order = models.ForeignKey('OrderModel', related_name='items', on_delete=models.CASCADE)
    book_id = models.ForeignKey('Books.BookModel', related_name='book', on_delete=models.CASCADE)
    count = models.IntegerField()

    class Meta:
        db_table = 'orderItems'
        verbose_name = 'OrderItem'
        verbose_name_plural = '2. OrderItems'