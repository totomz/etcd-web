import { Component, OnInit } from '@angular/core';
import { EtcdappService } from "../etcdapp.service";

import { MatTableDataSource } from '@angular/material/table';

export interface Value {
  value: string;
}

@Component({
  selector: 'app-key-navigator',
  templateUrl: './key-navigator.component.html',
  styleUrls: ['./key-navigator.component.scss']
})
export class KeyNavigatorComponent implements OnInit {

  displayedColumns: string[] = ['key'];
  dataSource: MatTableDataSource<string>;
  selectedValue: Value = { value: '' };

  constructor(private etcd: EtcdappService ) {
    this.etcd = etcd;

    this.etcd.getKeys().then(res => {
      this.dataSource = new MatTableDataSource(res);
    });

  }

  ngOnInit() {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (row, text) => {
      return row.includes(text);
    }
  }

  selectKey(key: any) {
    this.etcd.getValue(key).subscribe(o => {

      if(typeof o === 'object') {
        o = JSON.stringify(o, null, 4);
      }

      this.selectedValue = {
        value: o
      };
    });

  }

}
