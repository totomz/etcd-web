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
  selectedKey: any;

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
    this.selectedKey = key;
    this.etcd.getValue(key).subscribe(o => {

      try {
        o = JSON.stringify(JSON.parse(o), null, 4);
      }
      catch (e) {
        // not a json - not a problem
      }

      this.selectedValue = {
        value: o
      };
    });

  }

  addKey(newKey: string) {
    console.log(`SALVO ${newKey}`);
    this.etcd.putKeyValue(newKey, '--').subscribe((data) => {
      console.log(`Done? ${JSON.stringify(data)}`)
    });
  }

  updateValue(value: string) {

    try {
      value = JSON.stringify(value);
    }
    catch (e) {
      // not a json...?
    }

    console.log(`${this.selectedKey} ==> ${value}`);
    this.etcd.putKeyValue(this.selectedKey, value).subscribe((data) => {
      console.log(`Done? ${JSON.stringify(data)}`)
    });
  }
}
