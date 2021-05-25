import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reseller-table',
  templateUrl: './reseller-table.page.html',
  styleUrls: ['./reseller-table.page.scss'],
})
export class ResellerTablePage implements OnInit {
  displayedColumns = ['id', 'name', 'email', 'products', 'actions'];
  dataSource = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('ResellerPaginator', {static: false}) ResellerPaginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;

resellers = [
  {
      "name": "Peter Munyua",
      "email": "munyuapeter07@gmail.com",
      "products": "30"
  },
  {
    "name": "Peter Munyua",
    "email": "munyuapeter07@gmail.com",
    "products": "30"
},
{
    "name": "Peter Munyua",
    "email": "munyuapeter07@gmail.com",
    "products": "30"
},
{
    "name": "Peter Munyua",
    "email": "munyuapeter07@gmail.com",
    "products": "30"
},
{
    "name": "Peter Munyua",
    "email": "munyuapeter07@gmail.com",
    "products": "30"
},
{
    "name": "Peter Munyua",
    "email": "munyuapeter07@gmail.com",
    "products": "30"
},
{
    "name": "Peter Munyua",
    "email": "munyuapeter07@gmail.com",
    "products": "30"
},
]

  constructor() { }

  ngOnInit() {
      this.dataSource.data = this.resellers;
  }

  ngAfterViewInit() {
      this.dataSource.paginator = this.ResellerPaginator
  }
}