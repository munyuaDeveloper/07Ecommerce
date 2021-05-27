import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ProductService} from 'src/app/services/product.service';
import {ModalController} from "@ionic/angular";
import {AddProductPage} from "../add-product/add-product.page";

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  displayedColumns = ['id', 'name', 'email', 'products', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('productPagination', {static: false}) productPagination: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  @ViewChild('customLoadingTemplate', {static: false}) customLoadingTemplate: TemplateRef<any>;
  loading = false;

  constructor(
    private _productService: ProductService,
    public modalController: ModalController,) {

  }

  ngOnInit() {
   this.getProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.productPagination;
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: AddProductPage,
    });

    modal.onDidDismiss().then(res => {
      if (res['data']) {
        this.getProducts();
      }
    })

    return await modal.present();
  }
  getProducts() {
    this.loading = true;
    this._productService.getProducts().subscribe(res => {
      this.loading = false;
      this.dataSource.data = res['results'];
    }, err => {
      this.loading = false;
    });
  }
}
