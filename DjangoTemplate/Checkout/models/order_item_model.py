from django.db import models

class OrderItemModel(models.Model):
    order = models.ForeignKey('OrderModel', related_name='items', on_delete=models.CASCADE)
    book = models.ForeignKey('Books.BookModel', related_name='order_items', on_delete=models.PROTECT)
    count = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    title_x = models.CharField(max_length=255)

    class Meta:
        db_table = 'orderItems'
        verbose_name = 'OrderItem'
        verbose_name_plural = '2. OrderItems'