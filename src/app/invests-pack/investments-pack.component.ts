import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrentLoansService} from "../services/current-loans.service";
import {MatDialog} from "@angular/material/dialog";
import {InvestModalComponent} from "../modal/invest-modal/invest-modal.component";


@Component({
  selector: 'app-investments-pack',
  templateUrl: './investments-pack.component.html',
  styleUrls: ['./investments-pack.component.css']
})
export class InvestmentsPackComponent implements OnInit, OnDestroy {
  public loans: any[] = [];
  public modal: any;
  public totalAmount: number = 238500;
  constructor(
    public currentLoansService: CurrentLoansService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.loans = this.currentLoansService.loans;
    this.fetchTotal();
  }

  fetchTotal() {
    this.currentLoansService.investSum.subscribe((investSum) => {
      this.totalAmount += investSum;
    });
  }

  modalForm(item: object) {
     this.modal = this.dialog.open(InvestModalComponent,
      {
        width: '350px',
        data: {item}
      });

    this.currentLoansService.successInvest.subscribe((successInvest: boolean) => {
      if (successInvest) {
        this.dialog.closeAll()
      }
    });
    this.modal.afterClosed().subscribe(() => {
      this.fetchTotal();
      this.currentLoansService.successInvest.next(false)
    });
  }

  ngOnDestroy(): void {
    this.currentLoansService.successInvest.unsubscribe();
    this.modal.afterClosed().unsubscribe();
  }

}
