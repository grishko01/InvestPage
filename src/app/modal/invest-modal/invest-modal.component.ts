import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CurrentLoansService} from "../../services/current-loans.service";

@Component({
  selector: 'app-invest-modal',
  templateUrl: './invest-modal.component.html',
  styleUrls: ['./invest-modal.component.css']
})


export class InvestModalComponent implements OnInit {
  public investSum = 100;
  public errInvest: boolean = false;
  public termRemaining: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public currentLoansService: CurrentLoansService,
  ) {
  }

  ngOnInit(): void {
    this.getTime(this.data.item.term_remaining);
  }

  investing() {
    if (this.data.item.amount < this.investSum) {
      this.errInvest = true;
      return
    }
    if (this.investSum <= 0) return;
    this.data.item.available = this.data.item.available.replace(',', '')
    this.data.item.available = (this.data.item.available - this.investSum).toLocaleString();
    this.data.item.invest = true;
    this.currentLoansService.successInvest.next(this.data.item.invest);
    this.currentLoansService.investSum.next(this.investSum);
  }

  getTime(milliseconds: string) {
    let months = Math.floor(Number(milliseconds) / (1000 * 60 * 60 * 24 * 30) % 12),
      days = Math.floor(Number(milliseconds) / (1000 * 60 * 60 * 24) % 30),
      hours = Math.floor((Number(milliseconds) / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((Number(milliseconds) / (1000 * 60)) % 60);

    this.termRemaining = {
      months,
      days,
      hours,
      minutes
    }
  }
}
