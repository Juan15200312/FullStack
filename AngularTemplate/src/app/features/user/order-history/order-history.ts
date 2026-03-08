import {Component, computed, inject, signal} from '@angular/core';
import {DatePipe, NgClass} from "@angular/common";
import {CheckoutService} from "../../../core/services/checkout/checkout-service";
import {OrderPartResponse} from "../../../core/interfaces/checkout/order-part-Response";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-order-history',
    imports: [
        NgClass,
        RouterLink,
        DatePipe
    ],
    templateUrl: './order-history.html',
    styleUrl: './order-history.scss',
})
export class OrderHistory {
    private checkoutService = inject(CheckoutService);
    protected orderDetailPart = signal<OrderPartResponse[]>([])
    protected currentPage = signal(1)
    protected totalItems = signal(0)

    pageSize=5

    totalPages = computed(() =>
        Math.ceil(this.totalItems() / this.pageSize)
    )

    pages = computed(() => {

        const total = this.totalPages()
        const current = this.currentPage()
        const windowSize = 5

        let start = Math.max(1, current - 2)
        let end = start + windowSize - 1

        if (end > total) {
            end = total
            start = Math.max(1, end - windowSize + 1)
        }

        return Array.from(
            { length: end - start + 1 },
            (_, i) => start + i
        )

    })

    ngOnInit(): void {
        this.loarOrders(1)
    }

    loarOrders(page:number){
        this.checkoutService.orderDetailPart(page).subscribe({
            next: response => {
                console.log(response);
                this.orderDetailPart.set(response.results)
                this.totalItems.set(response.count)
                this.currentPage.set(page)
            }
        })
    }

}
