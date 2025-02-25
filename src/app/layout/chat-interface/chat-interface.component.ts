import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonService } from '../../shared/apis/common.service';
import { Router } from '@angular/router';
import { ChatData, ChatEntry } from '../../core/model/chat.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LogTableComponent } from '../log-table/log-table.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrl: './chat-interface.component.css'
})
export class ChatInterfaceComponent {
  logData: any;
  isButtonLoading: boolean = false;
  constructor(public commonService: CommonService, public router: Router, public dialog: MatDialog,) {

  }
  chatTitles: any
  newChatObj: any
  message: string = ""
  userID: string = ""
  startDate: Date | null = null;
  endDate: Date | null = null;
  fullDuration: string = ""
  isShowIcon: boolean = false
  loader: boolean = false;
  chatHistory: ChatData = new ChatData()
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  dialogRef!: MatDialogRef<any>;
  periodOptions = [{ "value": "1 Day", "displayName": "1 Day" },
  { "value": "Current Week", "displayName": "Current Week" },
  { "value": "Last 2 Weeks", "displayName": "Last 2 Weeks" },
  { "value": "Custom", "displayName": "Custom" }]

  ngOnInit() {
    this.userID = localStorage.getItem('userID') || ""
    this.getAllChatTitles();
    this.createNewChat()
  }

  showMenuIcon() {
    this.isShowIcon = !this.isShowIcon;
  }

  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }

  /*************************************************************************************
    * createNewChat()
    * purpose -to register the user
  *************************************************************************************/
  createNewChat() {
    let newChatObj = {
      "title": "New Chat",
      "titleUId": Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString()
    }
    console.log(JSON.stringify(newChatObj))
    this.chatHistory = new ChatData()
    this.chatHistory.titleName = newChatObj.title
    this.chatHistory.userID = this.userID
    this.chatHistory.titleUId = newChatObj.titleUId
    this.chatHistory.dateRange = ""
    this.logData = null
  }

  callAiModel() {
    if (!this.message.trim()) return;
    this.loader = true;
    let newUserEntry: ChatEntry = { question: this.message, answer: "" };
    this.chatHistory.chat.push(newUserEntry);
    this.scrollToBottom(); // Scroll after adding user message
    let reqObj = { "query": this.message, "logs": JSON.stringify(this.logData) };
    this.commonService.callAiModel(reqObj).subscribe(
      (data: any) => {
        let response = data;
        if (response) {
          this.message = "";
          newUserEntry.answer = data.answer;
          this.loader = false;
          if (this.chatHistory.chat.length == 1) {
            this.chatHistory.titleName = this.chatHistory.chat[0].question;
            setTimeout(() => {
              this.addUpdateChatHistory();
              setTimeout(() => {
                this.getAllChatTitles();
              }, 500);
            }, 1000);
            this.scrollToBottom(); // Scroll after AI response

          } else {
            setTimeout(() => {
              this.addUpdateChatHistory();
            }, 1000);
          }
        }
      },
      (error: any) => {
        console.log('No Response from model!', '');
        this.loader = false;
      }
    );
  }

  getAllChatTitles() {
    let reqObj = {
      "userID": this.userID,
    }
    this.commonService.getAllTitleByUserId(reqObj).subscribe
      ((data: any) => {
        let response = data;
        if (response) {
          this.chatTitles = response
        }
      }, (error: any) => {
        console.log('Error while loading chat titles!', '');
      })
  }

  downloadLogs() {
    if (this.fullDuration !== 'Custom') {
      this.getAllLogsByDateRange(this.fullDuration)
    }
    else {
      this.fullDuration = `${this.startDate?.toISOString()} - ${this.endDate?.toISOString()}`;
      this.getAllLogsByDateRange(this.fullDuration)
    }
  }

  getAllLogsByDateRange(duration: any) {
    let reqObj = {
      "duration": duration
    }
    this.isButtonLoading = true
    this.commonService.getAllLogsByDateRange(reqObj).subscribe
      ((data: any) => {
        let response = data;
        if (response) {
          this.logData = response.logList;
          this.chatHistory.dateRange = response.duration
          this.startDate = null
          this.endDate = null
          this.fullDuration = ""
          this.openSnackBar("Logs Downloaded Successfully")
        }
        this.isButtonLoading = false

      }, (error: any) => {
        console.log('Error while loading logs!', '');
        this.isButtonLoading = false
      })
  }

  showLogTable() {
    this.dialogRef = this.dialog.open(LogTableComponent, {
      width: '50%',
      height: '82%',
      panelClass: 'custom-modalbox',
      data: {
        logData: this.logData
      }
    });
    this.dialogRef.afterClosed().subscribe(() => {

    });
  }

  getAllChatHistory(titleUId: any) {
    let reqObj = {
      "userID": this.userID,
      "titleUId": titleUId
    }
    this.commonService.getAllChatHistoryByTitleId(reqObj).subscribe
      ((data: any) => {
        let response = data;
        if (response) {
          this.chatHistory = response
          setTimeout(() => {
            this.getAllLogsByDateRange(this.chatHistory.dateRange)
          }, 200);
        }
      }, (error: any) => {
        console.log('Error while loading chat history!', '');
      })
  }

  addUpdateChatHistory() {
    if (!this.chatHistory.titleUId) {
      this.chatHistory.titleUId = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString()
      this.chatHistory.titleName = this.chatHistory.chat[0].question
      this.chatHistory.userID = this.userID
    }
    this.commonService.addUpdateChatHistory(this.chatHistory).subscribe
      ((data: any) => {
        let response = data;
        if (response) {
        }
      }, (error: any) => {
        console.log('Error while updating chat history!', '');
      })
  }


  deleteChatHistoryByTitleId(titleUId: any) {
    let reqObj = {
      "userID": this.userID,
      "titleUId": titleUId
    }
    this.commonService.deleteChatHistoryByTitleId(reqObj).subscribe
      ((data: any) => {
        this.getAllChatTitles()
        this.openSnackBar("Chat Deleted Successfully")
      }, (error: any) => {
        console.log('Error while updating chat history!', '');
      })
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }


}
